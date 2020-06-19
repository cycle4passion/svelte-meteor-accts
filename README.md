This package allow you to compose/style Svelte/Meteor Login code as usual, and all the heavy lifting of credential varifications, password resets, and  signups is handled for you behind the scenes. Just pick and arrange your pieces. 

* There are Links ```<LoginLink /> <LogoutLink /> <SignUpLink/>``` and ```<ForgotLink/>```

These links have optional setting prop of "hideWhenShowing", when set true this hides the link if the corresponding form is showing (Like in Navbar example). These links could easily be changed to buttons.

 *  There are Forms ```<LoginForm /> <SignUpForm /> <ForgotForm>``` as well as an informations ```<Message />```

    These forms have optional settings props of "showAlways" (like in Cards
    example), or "showInitially" (LoginForm in Example #2 - Single Card)

  * There are Methods ```showlogin(), showforgot(), showsignup(), handleLogin(callback, message), handleForgot(callback, message), handleSigUp(callback, message)``` and ```handleLogout(callback, message)```
  
  The callback and message are optional parameters. Callback runs after the account transaction is done, and message updates ```<Message />```.
  
Here is a some simple example code

```js
import { Message, LoginForm, ForgotForm, SignupForm, LoginLink, LogoutLink, SignUpLink, ForgotLink } from "./Account/userStore.js";
import { user } from "./Account/userStore.js";
const { subscribe, selection, showlogin, showsignup, showforgot, handleLogin, handleForgot, handleSignup, handleLogout } = user;

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
<LoginForm showInitially="true">
  <div>
    <span class="status">Enter Email and Password to Login.</span>
    <span>Email</span>
    <input type="email" bind:value={$user.email} />
    <span>Password</span>
    <input type="password" bind:value={$user.password} />
    <button on:click={handleLogin} disabled={!$user.email || !$user.password}>
      Login
    </button>
  </div>
</LoginForm>

<SignupForm>
  <div>
    <span>Enter Email and Password to Signup.</span>
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
  <div>
    <span>Enter Email to Retrieve Password.</span>
    <span>Email</span>
    <input type="email" bind:value={$user.email} />
    <button on:click={handleForgot} disabled={!$user.email}>
      Request Password
    </button>
  </div>
</ForgotForm>
```
