import React from "react";
import SocialLogin from "react-social-login";

class SocialButton extends React.Component {
	render() {
		const { children, triggerLogin, ...props } = this.props;
		return (
			// <button onClick={triggerLogin} {...rest}>
			// 	{children}
			// </button>
			<button
				className="btn btn-lg btn-block btn-danger"
				// style="background-color: #dd4b39;"
				onClick={triggerLogin}
				{...props}
				type="submit"
			>
				{children}
			</button>
		);
	}
}

export default SocialLogin(SocialButton);
