export default function SignIn() {
  return (
    <>
      <h1>Create an account</h1>
      <section>
        <div className="">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="" />
        </div>
        <div className="">
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="" />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="" />
        </div>
        <div></div>
      </section>
    </>
  );
}
