<script>
  import { fly } from "svelte/transition";
  import {
    Message,
    LoginForm,
    ForgotForm,
    SignupForm,
    LoginLink,
    LogoutLink,
    SignUpLink,
    ForgotLink,
  } from "./Account/userStore.js";
  import { user } from "./Account/userStore.js";
  const {
    subscribe,
    selection,
    showlogin,
    showsignup,
    showforgot,
    handleLogin,
    handleForgot,
    handleSignup,
    handleLogout,
  } = user;

  let choice = "Example #1 - Compact";
</script>

<style>
  a {
    font-size: small;
    color: white;
    text-decoration: underline;
  }

  #card a {
    font-size: small;
    color: blue;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    background: wheat;
    padding: 5px;
    margin: 5px;
  }

  .largeform {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .status {
    display: flex;
    justify-content: center;
    font-size: small;
    margin: 15px;
    font-weight: bold;
  }

  .message {
    display: flex;
    justify-content: center;
    font-size: small;
    font-weight: bold;
  }

  .navbar {
    background: navy;
    color: white;
    padding: 10px 5px;
  }

  a,
  input,
  button {
    margin: 0 5px;
  }
</style>

<p>
  This package allow you to compose/style Svelte/Meteor Login code as usual, and
  all the heavy lifting of credential varifications, password resets, and
  signups is handled for you behind the scenes. Just pick and arrange your
  pieces. Below are three very different implementations using all the same
  pieces to give you an idea of the versatlity.
</p>
<ul>
  <li>
    There are Links {'<LoginLink /> <LogoutLink /> <SignUpLink/> and <ForgotLink/>'}
    <br />
    These links have optional setting prop of "hideWhenShowing", when set true
    this hides the link if the corresponding form is showing (Like in Navbar
    example). These links could easily be changed to buttons.
  </li>
  <li>
    There are Forms {'<LoginForm /> <SignUpForm /> <ForgotForm> as well as an informations <Message />'}
    <br />
    These forms have optional settings props of "showAlways" (like in Cards
    example), or "showInitially" (LoginForm in Example #2 - Single Card)
  </li>
  <li>
    There are Methods {'showlogin(), showforgot(), showsignup(), handleLogin(callback, message), handleForgot(callback, message), handleSigUp(callback, message) and handleLogout(callback, message)'}
    <br />
    The callback and message are optional parameters. Callback runs after the
    account transaction is done, and message updates {'<Message />'}.
  </li>
</ul>
<div style="margin: 5px;">
  {#each ['Example #1 - Compact', 'Example #2 - Card', 'Example #3 - MutipleCard/Full Page'] as example}
    <span>
      <input
        type="radio"
        bind:group={choice}
        value={example}
        on:click={() => ($user.selection = '')} />
      {example}
    </span>
  {/each}
</div>
<!-- --------------------------------- NAVBAR INLINE --------------------------------------- -->
{#if choice === 'Example #1 - Compact'}
  <p>Example #1 - a compact example in a Navbar</p>
  <div id="bar" class="navbar">
    <div style="display: flex;">
      <span
        style="display: flex; flex: 1; justify-content: center; align-items:
        center;">
        Navbar | Home | Links | About
      </span>
      <span
        style="display: flex; justify-content: flex-end; align-items: center;">
        <LoginForm>
          <div
            class="formInline"
            in:fly={{ x: 200, duration: 500 }}
            style="font-size: 12px;">
            <span>Email:</span>
            <input type="email" bind:value={$user.email} />
            <span>Password:</span>
            <input type="password" bind:value={$user.password} />
            <button
              on:click={handleLogin}
              disabled={!$user.email || !$user.password}
              style="height: 18px; padding: 0 5px;">
              Login
            </button>
          </div>
        </LoginForm>
        <SignupForm>
          <div class="formInline" style="font-size: 12px;">
            <span>Email</span>
            <input type="email" bind:value={$user.email} />
            <span>Password</span>
            <input type="password" bind:value={$user.password} />
            <button
              on:click={handleSignup}
              disabled={!$user.email || !$user.password}
              style="height: 18px; padding: 0 5px;">
              Signup
            </button>
          </div>
        </SignupForm>
        <ForgotForm>
          <div class="formInline" style="font-size: 12px;">
            <span>Email</span>
            <input type="email" bind:value={$user.email} />
            <button
              on:click={handleForgot}
              disabled={!$user.email}
              style="height: 18px; padding: 0 5px;">
              Forgot?
            </button>
          </div>
        </ForgotForm>
        <div
          style="display: flex; flex-direction: column; font-size: small; color:
          white;">
          <LoginLink hideIfShowing="true">
            <a href="#0" on:click={showlogin}>Login</a>
          </LoginLink>
          <LogoutLink>
            <a href="#0" on:click={handleLogout}>Logout</a>
          </LogoutLink>
          <ForgotLink hideIfShowing="true">
            <a href="#0" on:click={showforgot}>Forgot?</a>
          </ForgotLink>
          <SignUpLink hideIfShowing="true">
            <a href="#0" on:click={showsignup}>Sign-Up</a>
          </SignUpLink>
        </div>
      </span>
    </div>
    <div class="message" style="justify-content: flex-end;">
      <Message />
    </div>
  </div>
{/if}
<!-- --------------------------------------- SINGLE CARD -------------------------------------------- -->
{#if choice === 'Example #2 - Card'}
  <p>Example #2 - showing a single card where links change the form</p>
  <div
    id="card"
    style="margin-top: 20p; display: flex; flex-direction: column;">
    <div class="message" style="display: flex; justify-content: center;">
      <Message />
    </div>
    <div style="display: flex; justify-content: center;">
      <LoginLink>
        <a href="#0" on:click={showlogin}>Login</a>
      </LoginLink>
      <LogoutLink>
        {$user.email}
        <a href="#0" on:click={handleLogout}>Logout</a>
      </LogoutLink>
      <ForgotLink>
        <a href="#0" on:click={showforgot}>Forgot Password</a>
      </ForgotLink>
      <SignUpLink>
        <a href="#0" on:click={showsignup}>Sign-Up</a>
      </SignUpLink>
    </div>

    <LoginForm showInitially="true">
      <div class="form" style="margin: 5px auto;">
        <span class="status">Enter Email and Password to Login.</span>
        <span>Email</span>
        <input type="email" bind:value={$user.email} />
        <span>Password</span>
        <input type="password" bind:value={$user.password} />
        <button
          on:click={handleLogin}
          disabled={!$user.email || !$user.password}>
          Login
        </button>
      </div>
    </LoginForm>

    <SignupForm>
      <div class="form" style="margin: 5px auto;">
        <span class="status">Enter Email and Password to Signup.</span>
        <span>Email</span>
        <input type="email" bind:value={$user.email} />
        <span>Password</span>
        <input type="password" bind:value={$user.password} />
        <button
          on:click={handleSignup}
          disabled={!$user.email || !$user.password}>
          Signup
        </button>
      </div>
    </SignupForm>

    <ForgotForm>
      <div class="form" style="margin: 5px auto;">
        <span class="status">Enter Email to Retrieve Password.</span>
        <span>Email</span>
        <input type="email" bind:value={$user.email} />
        <button on:click={handleForgot} disabled={!$user.email}>
          Request Password
        </button>
      </div>
    </ForgotForm>
  </div>
{/if}
<!-- --------------------------------------- CARDS -------------------------------------------- -->
{#if choice === 'Example #3 - MutipleCard/Full Page'}
  <p>Example #3 - a full page option showing all options in a card form</p>
  <div
    id="cards"
    style="display: flex: border: 1px solid black; margin-top: 20px;">
    <div class="message">
      <Message />
    </div>
    <div class="largeform">
      <LoginForm showAlways="true">
        <div class="form" style="height: 220px;">
          <span class="status">Enter Email and Password to Login.</span>
          <span>Email</span>
          <input type="email" bind:value={$user.email} />
          <span>Password</span>
          <input type="password" bind:value={$user.password} />
          <button
            on:click={() => handleLogin('', 'You are now Logged in')}
            disabled={!$user.email || !$user.password}>
            Login
          </button>
        </div>
      </LoginForm>

      <SignupForm showAlways="true">
        <div class="form" style="height: 220px;">
          <span class="status">Enter Email and Password to Signup.</span>
          <span>Email</span>
          <input type="email" bind:value={$user.email} />
          <span>Password</span>
          <input type="password" bind:value={$user.password} />
          <button
            on:click={() => handleSignup('', 'You are Signed Up.')}
            disabled={!$user.email || !$user.password}>
            Signup
          </button>
        </div>
      </SignupForm>

      <ForgotForm showAlways="true">
        <div class="form" style="height: 220px;">
          <span class="status">Enter Email to Retrieve Password.</span>
          <span>Email</span>
          <input type="email" bind:value={$user.email} />
          <button
            on:click={() => handleForgot('', 'Check you Email for a Password Reset.')}
            disabled={!$user.email}>
            Request Password
          </button>
        </div>
      </ForgotForm>
    </div>
  </div>
{/if}
<!-- <pre>{JSON.stringify($user, null, 2)}</pre> -->
