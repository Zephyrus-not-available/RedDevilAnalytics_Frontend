type SkeletonProps = {
  className?: string
}

export function SkeletonBlock({ className }: SkeletonProps) {
  return <div className={`skeleton ${className ?? ''}`} aria-hidden="true" />
}

