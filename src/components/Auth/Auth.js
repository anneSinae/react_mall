const cstmrs = [
  { email: "kim@test.com", password: "1111", name: "Kim" },
  { email: "lee@test.com", password: "1111", name: "Lee" },
  { email: "park@test.com", password: "1111", name: "Park" },
]

export function signIn({ email, password }) {
  const user = cstmrs.find(
    (user) => user.email === email && user.password === password
  )
  if (user === undefined) throw new Error()
  return user
}