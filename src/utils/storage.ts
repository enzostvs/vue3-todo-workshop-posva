const $get = (key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return
  return JSON.parse(data)
}

const $patch = (key: string, value: any) => {
  const data = JSON.stringify(value)
  window.localStorage.setItem(key, data)
}

export { $get, $patch }
