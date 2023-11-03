package com.x04e.testwwwauthenticate;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/test/*")
public class AuthServlet extends HttpServlet {

	public void init() throws ServletException {
		// Initialise
	}

	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// Handle GET request
		var authType = req.getRequestURI().replace("/testwwwauthenticate/test/", "");
		var out = res.getOutputStream();
		res.setStatus(401);

		switch(authType){
			case "none":
				return;
			case "basic":
				res.setHeader("WWW-Authenticate", "Basic realm=\"testwwwauthenticate\"");
				return;
			case "negotiate":
				res.setHeader("WWW-Authenticate", "Negotiate");
				return;
			case "ntlm":
				res.setHeader("WWW-Authenticate", "NTLM");
				return;
				case "negotiate-ntlm-basic":
				// use addHeader to create duplicates on purpose
				res.addHeader("WWW-Authenticate", "Negotiate");
				res.addHeader("WWW-Authenticate", "NTLM");
				res.addHeader("WWW-Authenticate", "Basic");
				return;
			case "basic-ntlm-negotiate":
				// use addHeader to create duplicates on purpose
				res.addHeader("WWW-Authenticate", "Basic");
				res.addHeader("WWW-Authenticate", "NTLM");
				res.addHeader("WWW-Authenticate", "Negotiate");
				return;
			default:
				throw new ServletException("Auth type '"+ authType +"' unknown");
		}
	}

	public void destroy() {
		// Destroy
	}
}
