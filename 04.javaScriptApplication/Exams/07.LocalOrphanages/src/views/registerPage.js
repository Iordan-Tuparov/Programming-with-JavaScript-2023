import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/userService.js";

let registerTemplate = (onRegister) => html`<section
  id="register-page"
  class="auth"
>
  <form id="register" @submit="${onRegister}">
    <h1 class="title">Register</h1>

    <article class="input-group">
      <label for="register-email">Email: </label>
      <input type="email" id="register-email" name="email" />
    </article>

    <article class="input-group">
      <label for="register-password">Password: </label>
      <input type="password" id="register-password" name="password" />
    </article>

    <article class="input-group">
      <label for="repeat-password">Repeat Password: </label>
      <input type="password" id="repeat-password" name="repeatPassword" />
    </article>

    <input type="submit" class="btn submit-btn" value="Register" />
  </form>
</section>`;

export async function registerPage(ctx) {
  ctx.render(registerTemplate(onRegister));

  async function onRegister(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");
    let rePassword = formData.get("repeatPassword");

    if (!email || !password) {
      return alert("All field is required!");
    } else if (password !== rePassword) {
      return alert("Password is dont match!");
    }

    await register(email, password);
    ctx.page.redirect("/");
  }
}
