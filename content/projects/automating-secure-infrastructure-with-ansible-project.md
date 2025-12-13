---
title: "Automating Secure Infrastructure with Ansible: Managing SSH, Sudoers, and User Access Control"
date: "2021-12-12"
featured: true
featuredOrder: 8
category: "education"
summary: "Automating Secure Infrastructure with Ansible streamlines SSH key management, user provisioning, and sudoers configuration to enhance security and efficiency. This project ensures password-less authentication, centralized sudo monitoring, and safe system administration through Infrastructure as Code (IaC)."
image: "https://raw.githubusercontent.com/digin1/web-images/main/ansible.png"
tag: "Ansible, Ubuntu, Linux, DevOps, Infrastructure as Code"
role: "DevOps Engineer"
duration: "2 weeks"
---

## Introduction

Infrastructure automation is a critical aspect of modern system administration. My project focused on using Ansible to automate essential administrative tasks such as:

- Managing SSH Key Authentication
- Creating and Removing Users Securely
- Configuring Sudoers for Role-Based Access Control
- Monitoring and Logging Sudo Actions
- Deploying Security Enhancements (Safe Deletion, Password Policies, etc.)

The primary goal was to create an automated, repeatable, and scalable solution for managing user access and securing the infrastructure.

## 1. SSH Key Management and Secure Access Automation

One of the core challenges in multi-node environments is secure authentication. Instead of relying on password-based access, I automated SSH key generation, distribution, and configuration.

### Generating and Distributing SSH Keys
Ansible was used to generate SSH keys for different hosts and copy them to the appropriate machines.

Playbook for Generating SSH Keys (Conditional Execution to Avoid Overwriting):
```yaml
- name: Generate SSH keys for root if they don’t exist
  hosts: all
  become: false
  tasks:
    - name: Check if root SSH key exists
      stat:
        path: "~/.ssh/id_rsa"
      register: ssh_key_check

    - name: Generate SSH key for root
      shell: ssh-keygen -t rsa -N '' -f ~/.ssh/id_rsa
      when: not ssh_key_check.stat.exists
```

### Copying SSH Keys to Ansible Host
To allow secure, password-less communication between machines, public keys were copied to the Ansible control machine:

```yaml
- name: Copy SSH keys to Ansible control machine
  hosts: awsnodes
  become: true
  tasks:
    - name: Fetch public SSH key from nodes
      fetch:
        src: "~/.ssh/id_rsa.pub"
        dest: "/root/awskeys/{{ inventory_hostname }}_id_rsa.pub"
        flat: yes
```

### Copying SSH Keys to Target Nodes
```yaml
- name: Copy SSH keys to authorized_keys on target nodes
  hosts: logserver
  become: true
  vars:
    key_dir: /root/awskeys
  tasks:
    - name: Ensure .ssh directory exists
      file:
        path: "/root/.ssh"
        state: directory
        mode: "0700"

    - name: Add public SSH keys
      authorized_key:
        user: "root"
        key: "{{ lookup('file', item) }}"
        state: present
      with_fileglob: "{{ key_dir }}/*_id_rsa.pub"
```

### Outcome
* Password-less authentication across all servers
* Hardened security by eliminating password-based access
* Automated onboarding for new machines with SSH authentication

## 2. Automated User and Sudoers Management

Managing users manually across multiple servers can lead to inconsistencies and security risks. Ansible was used to automate user creation, privilege assignment, and sudoers configuration.

### Creating Users
```yaml
- name: Create users on all nodes
  hosts: all
  become: true
  vars:
    users:
      - alice
      - bob
      - charlie
  tasks:
    - name: Add users
      user:
        name: "{{ item }}"
        create_home: yes
        state: present
      loop: "{{ users }}"
```

### Granting Sudo Privileges
To enforce role-based access control, users were assigned to the sudoers file with strict validation:

```yaml
- name: Configure sudoers for specific users
  hosts: all
  become: true
  tasks:
    - name: Add users to sudoers
      lineinfile:
        path: /etc/sudoers
        state: present
        line: "{{ item }} ALL=(ALL) NOPASSWD: ALL"
        validate: "/usr/sbin/visudo -cf %s"
      loop: "{{ users }}"
```

### Outcome
* Role-based access management
* Automated onboarding & offboarding of users
* Strict sudoers validation to prevent misconfigurations

## 3. Monitoring Sudo Commands and Logging Activity

To improve security, all `sudo` activity needed to be logged and monitored remotely.

### Playbook for Enabling Sudo Logging
```yaml
- name: Configure sudo logging
  hosts: all
  become: true
  tasks:
    - name: Add sudo replay logging
      lineinfile:
        path: /etc/sudoers
        state: present
        insertafter: '^# Defaults.*visiblepw'
        line: |
          Defaults log_output
          Defaults!/usr/bin/sudoreplay !log_output
          Defaults!/sbin/reboot !log_output
```

### Automated Log Collection and Sync
A script was deployed to automatically sync logs from all nodes to a remote monitoring server.

```bash
#!/bin/bash
SRC="/var/log/sudo-io/"
DEST_DIR="/root/sudologs/{{ inventory_hostname }}/"
DEST_HOST="root@18.218.206.77"
SSH_PORT=4956

ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$DEST_HOST" "mkdir -p $DEST_DIR"
rsync -avz -e "ssh -p $SSH_PORT -o StrictHostKeyChecking=no" "$SRC" "$DEST_HOST:$DEST_DIR"
```

A cron job was configured to run this script every 12 hours.

```yaml
- name: Schedule sudo log monitoring script
  cron:
    name: "Monitor Sudo Logs"
    minute: "0"
    hour: "*/12"
    job: "/root/monitor_sudo_logs.sh >> /var/log/monitor_sudo_logs.log 2>&1"
    state: present
```

### Outcome
* Centralized sudo activity monitoring
* Regular log synchronization for auditing
* Prevention of privilege escalation attempts

## 4. Enhancing Security with Safe Deletion Policies

Accidental file deletions can cause irreversible damage. To prevent this, I implemented a safe deletion wrapper script.

### Safe `rm` Script
```bash
#!/bin/bash
echo "Warning: You are using the 'rm' command which deletes files permanently!"
echo "Files to be deleted: $@"
read -p "Are you sure you want to continue? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    /bin/rm "$@"
else
    echo "Operation cancelled."
fi
```

### Deploying Safe `rm` Script Using Ansible
```yaml
- name: Deploy safe_rm script
  hosts: all
  become: true
  tasks:
    - name: Copy safe_rm script
      copy:
        src: safe_rm.sh
        dest: /usr/local/bin/safe_rm
        mode: "0755"

    - name: Alias rm to safe_rm
      blockinfile:
        path: /etc/profile
        block: |
          alias rm='safe_rm'
        create: yes
```

### Outcome
* Prevention of accidental file deletions
* Enhanced safety while using `rm` command
* Forced user confirmation before permanent deletions

## Final Takeaways

By implementing Ansible automation, I was able to streamline system administration across multiple nodes, ensuring:

* Secure and password-less authentication using SSH keys
* Automated user management with structured onboarding & offboarding
* Centralized sudo monitoring with periodic log collection
* Strict sudoers file management with validation to prevent errors
* A safer file deletion process with `safe_rm`

This project reinforced my skills in infrastructure automation, security hardening, and scalable system management.