import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/userService.js";

let loginTemplate = (onLogin) => html`<section id="login-page" class="auth">
  <form id="login" @submit="${onLogin}">
    <h1 class="title">Login</h1>

    <article class="input-group">
      <label for="login-email">Email: </label>
      <input type="email" id="login-email" name="email" />
    </article>

    <article class="input-group">
      <label for="password">Password: </label>
      <input type="password" id="password" name="password" />
    </article>

    <input type="submit" class="btn submit-btn" value="Log In" />
  </form>
</section>`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onLogin));

  async function onLogin(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");

    if (!email || !password) {
      return alert("All field is required!");
    }

    await login(email, password);
    ctx.page.redirect("/");
  }
}
