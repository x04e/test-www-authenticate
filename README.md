# Test WWW-Authenticate

Simple Java project to send WWW-Authenticate challenges in response to requests to test how different browsers/platforms respond

The project is in Java WAR format. To run the test server, type: `mvn clean jetty:run`

## API

- `/testwwwauthenticate`

	Simple HTML page with links to all three options

- `/testwwwauthenticate/test/basic`
	
	Sends the following headers:
	```
	WWW-Authenticate: Basic
	```

- `/testwwwauthenticate/test/ntlm`
	
	Sends the following headers:
	```
	WWW-Authenticate: NTLM
	```

- `/testwwwauthenticate/test/negotiate`
	
	Sends the following headers:
	```
	WWW-Authenticate: Negotiate
	```

- `/testwwwauthenticate/test/negotiate-ntlm-basic`
	
	Sends the following headers:
	```
	WWW-Authenticate: Negotiate
	WWW-Authenticate: NTLM
	WWW-Authenticate: Basic
	```

- `/testwwwauthenticate/test/basic-ntlm-negotiate`
	
	Sends the following headers:
	```
	WWW-Authenticate: Basic
	WWW-Authenticate: NTLM
	WWW-Authenticate: Negotiate
	```

## Results

Below are the results of testing on Chrome, Firefox, and Edge on Windows, Linux, and Android:

### Windows

| WWW-Authenticate                        | Chrome        | Firefox *        | Edge                   |
|-----------------------------------------|---------------|------------------|------------------------|
| Basic                                   | Browser popup | Browser popup    | Browser popup          |
| NTLM                                    | Browser popup | None             | Windows Security popup |
| Negotiate                               | Browser popup | Browser popup    | Windows Security popup |
| Negotiate, NTLM, then Basic (3 headers) | Browser popup | 2x Browser popup | Windows Security popup |
| Basic, NTLM, then Negotiate (3 headers) | Browser popup | 2x Browser popup | Windows Security popup |

\* Firefox must be hard-refreshed (CTRL+F5) in between tests as it stops showing authentication popups after they are closed 1-2 times

### Linux and Android

| WWW-Authenticate                        | Chrome        | Firefox *        | Edge          |
|-----------------------------------------|---------------|------------------|---------------|
| Basic                                   | Browser popup | Browser popup    | Browser popup |
| NTLM                                    | None          | None             | None          |
| Negotiate                               | Browser popup | Browser popup    | Browser popup |
| Negotiate, NTLM, then Basic (3 headers) | Browser popup | 2x Browser popup | Browser popup |
| Basic, NTLM, then Negotiate (3 headers) | Browser popup | 2x Browser popup | Browser popup |

\* Firefox must be hard-refreshed (CTRL+F5, or closed and reopened on Android) in between tests as it stops showing authentication popups after they are closed 1-2 times