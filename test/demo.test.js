function sum(a, b) {
  return a + b
}

test('10 + 20 等于 30', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})

test('10 + 20 不等于 40', () => {
  const res = sum(10, 20)
  expect(res).not.toBe(40)
})