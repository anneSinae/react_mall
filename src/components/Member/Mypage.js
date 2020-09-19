import React from "react"

function Mypage({ user }) {
  const { email, password, name } = user || {}
  return (
    <>
      <h1>Mypage</h1>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
    </>
  )
}

export default Mypage