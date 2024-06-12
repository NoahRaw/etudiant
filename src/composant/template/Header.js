/* eslint-disable jsx-a11y/anchor-is-valid */
// RightPanel.js
import React, { useState} from 'react';

const Header = ({setCurrentComponent,setIsConnected}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async (componentKey) => {
        setCurrentComponent(componentKey);
    }

    const deconnection = async (componentKey) => {
        setLoading(true)
        localStorage.removeItem("profil");
        localStorage.removeItem("id_utilisateur");
        setCurrentComponent(componentKey);
        setIsConnected(false);
      };

    return(
    <header>
       <div class="header-area">
            <div class="main-header ">
                <div class="header-top top-bg d-none d-lg-block">
                   <div class="container">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-lg-8">
                            <div class="header-info-left">
                                <ul>                          
                                    <li>needhelp@gotrip.com</li>
                                    <li>666 569 025077</li>
                                    <li>broklyn street new york</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="header-info-right f-right">
                                <ul class="header-social">    
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                   <li> <a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                                </ul>
                            </div>
                        </div>
                       </div>
                   </div>
                </div>
               <div class="header-bottom  header-sticky">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-xl-2 col-lg-2 col-md-1">
                                <div class="logo">
                                  <a href="index.html"><img src="logo.webp" style={{width : 200}} alt=""/></a>
                                </div>
                            </div>
                            <div class="col-xl-10 col-lg-10 col-md-10">
                                <div class="main-menu f-right d-none d-lg-block">
                                    <nav>               
                                        <ul id="navigation">                                                                                                                                     
                                            <li><a href="#" onClick={() => handleClick('nbrBilletVenduParEtudiant')}>Home</a></li>
                                            <li><a href="#" onClick={() => handleClick('nbrBilletVenduParEtudiant')}>Vente de billets par etudiant</a></li>
                                            <li><a href="#" onClick={() => handleClick('vente_billet')}>Vente de billets</a></li>
                                            <li><a href="#" onClick={() => handleClick('csv')}>Import csv</a></li>
                                            <li><a href="#" onClick={() => handleClick('Graphe_montant_par_pack')}>Graphe_montant_par_pack</a></li>
                                            {loading===false &&
                                                <li><a href="#" onClick={() => deconnection('login')}>Deconnexion</a></li>
                                            }
                                            {loading === true && (<li>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                <img src="Loading_2.gif" alt="Loading..." />
                                            </div></li>
                                            )}

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
       </div>
    </header>

)};

export default Header;
