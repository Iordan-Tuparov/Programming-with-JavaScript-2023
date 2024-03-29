import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userService.js";

let registerTemplate = (onRegister) => html`<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form class="login-form" @submit="${onRegister}">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">login</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(onRegister));

  async function onRegister(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("re-password");

    if (!email || !password || !rePass) {
      alert("All field is required!");
      return;
    } else if (password !== rePass) {
      alert("Passwords dont match");
      return;
    }

    await register(email, password);
    ctx.page.redirect("/dashboard");
  }
}
