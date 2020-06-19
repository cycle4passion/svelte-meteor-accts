
import { writable, derived } from "svelte/store";
// import { Meteor } from "meteor/meteor";
// import { Accounts } from "meteor/accounts-base";
import Message from "./Message.svelte";
import LoginForm from "./LoginForm.svelte";
import ForgotForm from "./ForgotForm.svelte";
import SignupForm from "./SignupForm.svelte";
import LoginLink from "./LoginLink.svelte"
import SignUpLink from "./SignUpLink.svelte";
import ForgotLink from "./ForgotLink.svelte";
import LogoutLink from "./LogoutLink.svelte";

export { Message, LoginForm, ForgotForm, SignupForm, LoginLink, LogoutLink, SignUpLink, ForgotLink };

let userDefault = {
	email: "",
	password: "",
	selection: "",
	statusLogin: false,
	message: "",
}
// May not need statusLogin? better to use Meteors?

function createUser() {
	const user = writable(userDefault);

	const { subscribe, set, update } = user;
	return {
		subscribe,
		set,
		showlogin: () => update(prior => ({ ...prior, selection: prior.selection === "login" ? "" : "login" })),
		showforgot: () => update(prior => ({ ...prior, selection: prior.selection === "forgot" ? "" : "forgot" })),
		showsignup: () => update(prior => ({ ...prior, selection: prior.selection === "signup" ? "" : "signup"})),
		handleLogin: (cb = "", newMessage = "") => update(prior => {
			// 			 Meteor.loginWithPassword(prior.email, prior.password, err => {
			//       if (!err) {
			//         return {...prior, statusLogin: true }
			//       }
			//				 return {...prior, message: err.reason }	
			//     	});
			return { ...prior, statusLogin: true, message: newMessage ? newMessage : prior.message }
		}),
		handleSignup: (cb = "", newMessage = "") => update(prior => {
			// 			Accounts.createUser({ prior.password, prior.email },
			//       err => {
			//         if (!err) {
			//					return { ...prior, statusLogin: true }
			//         }
			//				  return {...prior, message: err.reason };			
			//       }
			//     )
			// remove below when Meteor dropped in
			if (cb) cb();
			return { ...prior, message: newMessage ? newMessage : prior.message }
		}),
		handleForgot: (cb = "", newMessage = "") => update(prior => {
			console.log("drop in Meteor Forgot");
			if (cb) cb();
			// remove below when Meteor dropped in
			return { ...prior, message: newMessage ? newMessage : prior.message }
		}),
		handleLogout: (cb = "", newMessage = "") => update(prior => {
				// Meteor.logout();
				if (cb) cb();
				return { ...prior, statusLogin: false, password: "", selection: "", message: newMessage ? newMessage : prior.message }
		})			
	}
}

export const user = createUser();
