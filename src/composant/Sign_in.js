/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../css/Login.css';

const Login = ({setIsConnected,setCurrentComponent}) => {
  const [login, setLogin] = useState('noah@gmail.com');
  const [pwd, setPwd] = useState('0000');
  const [nom, setNom] = useState('noah');
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const voir = () => 
  {
	setCurrentComponent('login')
  }

  const handleLogin = async (e) => {
    e.preventDefault();
	setFormSubmitted(true);

    try {
		const response = await fetch('https://etudiant-backend-csyozwddq-noahs-projects-49759aad.vercel.app/utilisateurs/sign_in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nom : nom,
                mail: login,
				mdp : pwd,
			}),
      	});

      if (response.ok) {
        const data = await response.json();
		console.log(data.idutilisateur);
        localStorage.setItem('id_utilisateur', data.idutilisateur);
		console.log(`id_utilisateur ${data._idUtilisateur}`)
        localStorage.setItem('profil', data.profil);
        setIsConnected(true);
		setCurrentComponent('nbrBilletVenduParEtudiant');
      } else {
        console.error('Erreur lors de l\'authentification');
      }
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
	finally
      {
        setLoading(false);
		setFormSubmitted(false)
      }
  };

  return (
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form onSubmit={handleLogin} class="login100-form validate-form">
					<span class="login100-form-title p-b-43">
						Sign-in to continue
					</span>
					
					<div class="wrap-input100 validate-input">
						<input class="input100" value={nom} onChange={(e) => setNom(e.target.value)} type="text" placeholder='nom'/>
						<span class="focus-input100"></span>
						{/* <span class="label-input100">Email</span> */}
					</div>
					
                    <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" value={login} onChange={(e) => setLogin(e.target.value)} type="email" placeholder='email'/>
						<span class="focus-input100"></span>
						{/* <span class="label-input100">Email</span> */}
					</div>
					
					
					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='Your password'/>
						<span class="focus-input100"></span>
						{/* <span class="label-input100">Password</span> */}
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">
							Sign-in
						</button>
					</div>

					{formSubmitted && loading === true && (
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
						<img src="Loading_2.gif" alt="Loading..." />
					</div>
					)}

					<div class="container-login100-form-btn" style={{"margin-top": "50px"}}>
						<button class="login100-form-btn" onClick={voir} style={{"background": "black"}}>
							Login
						</button>
					</div>

					<div class="text-center p-t-46 p-b-20">
						<span class="txt2">
							
						</span>
					</div>

					<div class="login100-form-social flex-c-m">
						<a href="#" class="login100-form-social-item flex-c-m bg1 m-r-5">
							<i class="fa fa-facebook-f" aria-hidden="true"></i>
						</a>

						<a href="#" class="login100-form-social-item flex-c-m bg2 m-r-5">
							<i class="fa fa-twitter" aria-hidden="true"></i>
						</a>
					</div>
				</form>
				<div class="login100-more" style={{backgroundImage: `url('background.jpg')`}}>
				</div>
			</div>
		</div>
	</div>

  );
};

export default Login;
