// source: https://stackoverflow.com/a/75828547

export class WorkerInterval {
  worker: Worker
  constructor(callback: () => void, interval: number) {
    const blob = new Blob([`setInterval(() => postMessage(0), ${interval});`])
    const workerScript = URL.createObjectURL(blob)
    this.worker = new Worker(workerScript)
    this.worker.onmessage = callback
  }

  stop() {
    this.worker.terminate()
  }
}
