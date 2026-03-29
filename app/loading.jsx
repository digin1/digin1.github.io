export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-neural-blue/30 border-t-neural-blue rounded-full animate-spin" />
        <p className="text-sm text-light-text-secondary dark:text-muted-steel">Loading...</p>
      </div>
    </div>
  );
}
