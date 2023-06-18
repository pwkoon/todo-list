import React, { ChangeEvent, useState } from 'react'


function Person() {

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [personName, setPersonName] = useState<string>("Dear Guest");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "first") {
      setFirstName(event.target.value)
    } else {
      setLastName(event.target.value)
    }
  };

  const welcomeUser = (): void => {
    let username = lastName + " " + firstName
    username = username.toUpperCase()
    setPersonName(username)
  }

  return (
    <>
      <div>Hello {personName}</div>
      <input type='text' placeholder='first name' name="first" onChange={handleChange}/>
      <input type='text' placeholder='last name' name="last" onChange={handleChange}/>
      <button onClick={welcomeUser}>Confirm</button>
    </>
  )
}

export default Person
