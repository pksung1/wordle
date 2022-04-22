import { useRecoilSnapshot } from 'recoil'
import { useEffect } from 'react'

export function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.log('The following atoms were modified:')
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}
