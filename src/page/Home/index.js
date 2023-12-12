import React, { useState } from 'react'
import '../../assets/css/Education.css'
import s3img from '../../assets/9.png'
import forex from '../../assets/forex.png'
import crypto from '../../assets/crypto.png'
import social1 from '../../assets/social1.png'
import ceo from '../../assets/ceo.png'
import social2 from '../../assets/social2.png'
import social3 from '../../assets/social3.png'
import social4 from '../../assets/social4.png'
import web3 from '../../assets/web3.png'
import logo from '../../assets/ico2.png'
import cmain from '../../assets/cryptotrade.png'
import a1 from "../../assets/sec22.png"
import why from "../../assets/why.svg"
import why2 from "../../assets/why2.svg"
import why3 from "../../assets/why3.svg"
import a2 from "../../assets/sec21.png"
import { useNavigate } from 'react-router-dom';
import a3 from "../../assets/sec24.png"
import { Link } from 'react-router-dom'
const Home = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const history = useNavigate();
    const handleClick = () => {
       
        window.scrollTo(0, 0); // Scroll to the top
      };
      const handleClick2 = () => {
       
        window.scrollTo(0, 0); // Scroll to the top
      };
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };
    return (
        <>
          
  <div className="edumain">
  <div className="navbar">
    <Link class="logo" href="#"><img src={logo} style={{width: 60, height: 60,}} alt="" /></Link>
      <button className="toggle-button" onClick={toggleNav}>
        ☰
      </button>
      <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
      <div className='alink'>
      <Link to='/login?login'><button class="btn btn-warning">Login</button></Link>
                <Link to="/login"><button class="btn btn-warning">SignUp</button></Link>
      </div>
      </div>
    </div>
            <div className="section1 container mb-5">
                <div className="sec1left">
                    <p className='s1head'>SIR GLOBAL ACADEMY</p>
                    <p className='s1para'>SIR Global Academy excels in teaching trading and investment
                        with a practical, expert-led approach. Their curriculum, blending theory with real-world strategies,
                        stands out in preparing individuals for success in financial markets.</p>
                    <Link to='/register' class="btn btn-warning"> Get Started</Link>
                </div>
                <div className="sec1right">
                    <img src={cmain} className='mainimg' alt="" />
                </div>
            </div>

<div className="extra">
    <div className="why">
        <div className="whyleft">
<img src={why} style={{width:"100%", height:"100%"}} alt="" />
        </div>
        <div className="whyright">
        <h1 className="whyhead">
            Why Choose SIR Global Academy?
        </h1>
<p className="whydesc">
<br />
<b>Expertise and Comprehensive Curriculum</b>:<br /> SIR Global Academy offers a comprehensive curriculum developed by industry experts. This ensures that students receive in-depth knowledge covering various aspects of cryptocurrencies, blockchain technology, decentralized finance, and related subjects.
<br /><br />
<b>Innovative Teaching Methodologies</b>: <br />The academy might utilize innovative and effective teaching methods, such as practical projects, case studies, workshops, and real-world simulations, to enhance learning outcomes and provide a hands-on understanding of the subject matter.
<br /><br />
<b>Global Access and Inclusivity</b>: <br />SIR Global Academy may provide education accessible globally, making it possible for students from diverse geographical locations to enroll and benefit from their courses. It could foster a diverse and inclusive learning community.
<br /><br />
<b>Industry Connections and Networking</b>: <br />The academy might have strong ties with industry leaders, companies, and professionals in the crypto and blockchain space. This can provide students with networking opportunities, internships, and potential career paths within the industry.
<br /><br />
<b>Cutting-edge Insights and Updates</b>: <br />SIR Global Academy may offer up-to-date insights into the rapidly evolving world of cryptocurrencies and blockchain. This can ensure that students are informed about the latest trends, developments, and innovations in the field.
<br />
</p>
        </div>
    </div>

    <div className="why2 container">
    <div className="vision mt-3">
    <img src={why2} style={{width:"60%", height:"60%"}} alt="" />
    <h3 className="vhead mt-4">VISION</h3>
    <p className="visionpara">
    Sir Global Academy, our vision for Crypto Education is to empower individuals worldwide with comprehensive
     knowledge and expertise in the dynamic realm of cryptocurrencies and blockchain technology. We aspire to 
     cultivate a globally inclusive learning environment that fosters deep understanding, critical thinking, 
     and practical skills essential for navigating the complexities of the digital economy. Our commitment lies
      in delivering cutting-edge education, merging theoretical foundations with real-world applications, thereby 
      enabling students to become proficient in blockchain technology, decentralized finance (DeFi), crypto markets, 
      smart contracts, and the underlying principles driving this transformative industry. 
    </p>
</div>

<div className="mission">
<img src={why3} style={{width:"60%", height:"60%"}} alt="" />
    <h3 className="vhead mt-4">MISSION</h3>
    <p className="visionpara">
    At Sir Global Academy, our mission is to provide accessible, top-tier education in cryptocurrencies 
    and blockchain technology, catering to diverse learners globally. We strive to deliver comprehensive, 
    up-to-date curriculum curated by industry experts, offering a blend of theoretical knowledge and practical skills. 
    Our mission encompasses fostering an engaging learning environment that encourages critical thinking,
     problem-solving, and hands-on experience in navigating the intricacies of the crypto landscape. 
     We are committed to nurturing a community of learners equipped with the proficiency to comprehend blockchain technology, 
     analyze crypto markets, leverage decentralized finance, and apply ethical practices. 
    </p>
</div>
    </div>
</div>

            <div className="section2 mb-5">
                <p className='sechead'>SIR Global Academy Education</p>
                <div className="sec2cards">
                    <div className="sec2card" data-aos="fade-up" data-aos-duration="2000">
                        <img src={a1} style={{ width: 100, height: 100, marginBottom: 15 }} alt="" />
                        <p style={{ fontSize: 20, fontWeight: 700, fontFamily: "Roboto" }}>Stock Education</p>
                        <p>Stocks are a type of security that gives stockholders a share of ownership in a company.

Companies sell shares typically to gain additional money to grow the company.  </p>

                    </div>


                    <div className="sec2card" data-aos="fade-up" data-aos-duration="2000">
                        <img src={a2} style={{ width: 100, height: 100, marginBottom: 15 }} alt="" />
                        <p style={{ fontSize: 20, fontWeight: 700, fontFamily: "Roboto" }}>Forex Education</p>
                        <p>Forex (foreign exchange) investment involves trading global currencies in the decentralized foreign
                            exchange market, with the aim of profiting from fluctuations in exchange rates. </p>
                    </div>
                    <div className="sec2card" data-aos="fade-up" data-aos-duration="2000">
                        <img src={a3} style={{ width: 100, height: 100, marginBottom: 15 }} alt="" />
                        <p style={{ fontSize: 20, fontWeight: 700, fontFamily: "Roboto" }}>Crypto Education</p>
                        <p>
                            Cryptoinvestment entails purchasing and holding digital assets like Bitcoin or Ethereum with the
                            expectation of capital appreciation.</p>
                    </div>

                </div>
            </div>

            <div className="section3" id="stock">
                <p className='sechead'>Stock Education</p>

                <div class="sec3detail">
                    <div class="s3left" style={{padding: 2, textAlign:"justify"}}>
                        <p>When people talk about investing in stocks, they're usually referring to common stock. These kinds of
                            stocks give you the opportunity to join in the success of public companies, and as such, they're an
                            investment that can really grow your portfolio.
                            <br />
                            <br />
                            Because you're a part owner of the company that issues your stock, it's pretty simple: For the most
                            part, when the company makes money, you make money. (Conversely, of course, when the company loses
                            money ... well, you get the picture.)
                            <br /><br />
                            There are a couple of ways you'll see this part-ownership reflected.
                            <br /><br />
                            First, the price of each share of stock can increase in value. If you buy 50 shares at $10 a share
                            and then the share price increases to $15, you're now $250 richer.
                            <br /><br />
                            The company can also choose to issue a dividend to shareholders. Say the issuer of your 50 shares of
                            stock announces a $2 dividend. That means you'll be paid $100 (which you can use to buy more shares,
                            if you wish).
                        </p>
                    </div>
                    <div class="s3right">
                        <img src={s3img} style={{ width: "60%", height: "60%" }} alt="" />
                    </div>
                </div>

                <p style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>Choosing Stocks Strategy</p>

                <div className="strategy">
                    <div class="colcard">
                        <h4  >Growth & value</h4>
                        <p><span >
                            Companies generally fall into 1 of 2 categories depending on how they make money for
                            their investors.
                            <br />
                            Growth companies are in an expansion phase. As they grow, the value of their shares
                            increases.
                            <br />
                            Value companies are relatively established. While they may still be growing, there's
                            not as much room for the kind of rapid expansion that growth companies pursue. So
                            rather than plow all their cash flow into opportunities for development, these
                            companies are more likely to pay dividends.
                        </span></p>
                    </div>
                    <div class="colcard">
                        <h4 class="golden-text" >Capitalization</h4>
                        <p><span >
                            Companies can also be divided up based on the total value of their shares—their
                            "capitalization." Stocks are generally considered to be large-, mid-, or small-cap,
                            although at the extremes you may also see references to mega-cap or micro-cap
                            stocks.
                            <br />
                            The boundaries between one grouping and the next aren't firm, and they change as the
                            overall market value changes. In general, large-cap stocks make up about 65% to 75%
                            of the entire market, and mid- and small-cap stocks about 10% to 15% each.
                            <br />
                        </span></p>
                    </div>
                    <div class="colcard">
                        <h4 class="golden-text" >Sectors</h4>
                        <p><span >
                            Companies can also be grouped by sector. As with capitalization, there are several
                            different sector classification systems. Most systems include categories like
                            technology, health care, and energy.
                            <br />
                            Stocks within particular sectors will tend to react in predictable ways to economic
                            conditions, so it's important to make sure your investments don't get too
                            concentrated in specific sectors, unless you're doing it intentionally as part of
                            your investment plan.
                        </span></p>
                    </div>
                </div>


            </div>


<div className="section4" id="forex">
<p className='sechead'>Forex Education</p>
<div class="sec3detail2">
            <div class="s3left" style={{padding: 2, textAlign:"justify"}}>
                In the ever-evolving landscape of financial markets, forex (foreign exchange) trading stands out as a
                dynamic and liquid arena for investors. As the largest and most decentralized market globally, forex
                offers unparalleled opportunities for those looking to capitalize on currency fluctuations. <br /> This
                article serves as a comprehensive guide to forex investment, exploring the fundamentals, strategies, and
                essential considerations for success in this exciting realm.
                <br />
                <br />
                Forex trading involves the buying and selling of currencies in a global marketplace. Trillions of
                dollars are exchanged daily, making it the most liquid market in the world. The forex market operates 24
                hours a day, five days a week, allowing investors to react to global economic events in real-time.
                <br /> <br /> Currency pairs are the foundation of forex trading, representing the exchange rate between
                two currencies.

            </div>
            <div class="s3right">
                <img src={forex} style={{ width: "80%", height: "80%" }} salt="" />
            </div>
        </div>

        <div className="strategy">
        <div class="colcard">
        <h4 class="golden-text" >Risk Management</h4>
                            <p><span >

                                    Given the dynamic nature of forex trading, effective risk management is crucial.
                                    Leveraging allows traders to control larger positions with smaller amounts of
                                    capital, but it also amplifies potential losses.<br /> Setting stop-loss orders,
                                    diversifying currency pairs, and carefully sizing positions are essential risk
                                    management strategies. Maintaining a risk-reward ratio ensures that potential losses
                                    are kept in check relative to potential gains.
                                </span></p>
                </div>
                <div class="colcard">
                <h4 class="golden-text" >Technical and Fundamental Analysis</h4>
                            <p><span >
                                    Successful forex traders employ a combination of technical and fundamental analysis
                                    to make informed decisions.<br /> Technical analysis involves studying historical
                                    price charts and patterns to predict future price movements, while fundamental
                                    analysis considers economic factors and news events. A well-rounded approach that
                                    incorporates both methods provides a more comprehensive understanding of the market.

                                </span></p>
                </div>
                <div class="colcard">
                <h4 class="golden-text" >Choosing a Reliable Broker</h4>
                            <p><span >

                                    Selecting the right forex broker is a critical step in a trader's journey. Factors
                                    such as regulatory compliance, transaction costs, available currency pairs, and
                                    trading platforms should be carefully evaluated.<br /> A reputable and transparent
                                    broker ensures a secure and seamless trading experience, providing the necessary
                                    tools for success in the forex market.
                                </span></p>
                </div>
        </div>
</div>



<div className="section5" id="crypto">
<p className='sechead'>Crypto Education</p>
<div class="sec3detail">
            <div class="s3left" style={{padding: 2, textAlign:"justify"}}>

                A cryptocurrency is a digital or virtual currency secured by cryptography, which makes it nearly
                impossible to counterfeit or double-spend. Most cryptocurrencies exist on decentralized networks using
                blockchain technology—a distributed ledger enforced by a disparate network of computers.
                <br />
                A defining feature of cryptocurrencies is that they are generally not issued by any central authority,
                rendering them theoretically immune to government interference or manipulation.
                <br /> <br />
                <span style={{fontWeight: 700}}>KEY TAKEAWAYS</span> <br />
                <ul>
                    <li>
                        A cryptocurrency is a form of digital asset based on a network that is distributed across a
                        large number of computers. This decentralized structure allows them to exist outside the control
                        of governments and central authorities.

                    </li>
                    <li>Some experts believe blockchain and related technologies will disrupt many industries, including
                        finance and law.
                    </li>
                    <li>The advantages of cryptocurrencies include cheaper and faster money transfers and decentralized
                        systems that do not collapse at a single point of failure.
                    </li>
                    <li>The disadvantages of cryptocurrencies include their price volatility, high energy consumption
                        for mining activities, and use in criminal activities.
                    </li>
                </ul>
            </div>
            <div class="s3right">
                <img src={crypto} style={{width: "100%", height: "100%"}} alt="" />
            </div>
        </div>
</div>

<div className="section6" id='web3'>
    <p className='sechead'>Web 3.0 Education</p>

    <div className="s6">
        <div className="s6left">
        <img src={web3} style={{width:"100%", height:"100%", borderRadius:15}} alt="" />

        </div>
        <div className="s6right" style={{padding: 2, textAlign:"justify"}}>
<p> Web 3.0 is the next evolutionary step for the Internet. It is a decentralized online backdrop built on the blockchain at its most basic level. It will allow users to own platforms and apps developed on Web3 rather than a central authority. Users earn their privilege by building and maintaining the services.
<br /><br />
Data Privacy is the key issue with the current state of the Internet. Social media networks have been collecting and exploiting user data for advertising revenue. We are already aware of the net worth of social media companies which is proof of how much they have earned through selling personal information. Web 3.0 will change the Internet for the better by introducing decentralization.
<br /><br />
For example, content creators on decentralized social network platforms can retain greater control of their digital essence while being rewarded for their valuable contribution to the platform.
<br /><br />
The perfect example of Web 3.0 is a cryptocurrency, a decentralized currency that is not governed or controlled by a single government. Cryptocurrencies are managed by the people using and minting them in a simultaneous process.
<br /><br />
The next significant element of Web3 is blockchain, the backbone of cryptocurrency. Blockchain will also be used to verify and validate ownership of digital assets soon. Moreover, just like NFTs (non-fungible tokens), other blockchain-based technologies are expected to develop where only verified content owners will gain monetary advantages from the assets.
 
</p>
        </div>
    </div>
    <p className='sechead'>Properties of Web 3.0</p>
    <div className="strategy">
        <div class="colcard">
        <h4 class="golden-text" >Semantic Web</h4>
                            <p><span >

                            One of the key elements of Web 3.0 is “semantic web.”. The semantic web enhances online technologies by allowing users to create, share, and connect content via search and analysis based on the ability to understand the meaning of words rather than keywords or numbers.
                                </span></p>
                </div>
                <div class="colcard">
                <h4 class="golden-text" >3D Graphics</h4>
                            <p><span >
                            3D Graphics is being used widely in websites and services in Web 3.0 such as online games, e-commerce, and portfolio website. Here is the best example of a 3d website by Bruno Simon.

                                </span></p>
                </div>
                <div class="colcard">
                <h4 class="golden-text" >Artificial Intelligence</h4>
                            <p><span >

                            Semantic Web and Artificial Intelligence are the two cornerstones of web 3.0. By combining this capacity with natural language processing, Web 3.0 allows computers to comprehend material in the same way that people do, resulting in quicker and more relevant results. To meet the demands of users, they grow increasingly intelligent.

                                </span></p>
                </div>
        </div>
</div>

<div className="section7" id='team'>
<p className='sechead'>Team Members</p>
<div class="card">
  <div class="img"> <img src={ceo} class="img"  alt="" /></div>
  <span>Shivanshu Gupta</span>
  <span style={{fontSize:12}}>CEO & Founder</span>
  <p class="info">Shivanshu Gupta, (an IT PROFESSIONAL) who has long standing experience in leading, growing and transforming businesses in competitive environments.</p>
  <div class="share">
    <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg></a>
    <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
  </svg></a>
    <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
  </svg></a>
  <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"></path>
  </svg></a>
  </div>
</div>
</div>


<div className="fmain">
				<footer className="footer-02" >
					<div className="container" style={{ paddingTop: 73 }}>

						<div className="row">
							<div className="col-md-4 col-lg-5" >
								<div className="row">
									<div className="col-md-12 col-lg-8 mb-md-0 mb-4">
                                    <h2 class="footer-heading">SIR Global Academy</h2>
                                <p>SIR Global Academy excels in teaching trading and investment with a practical,
                                    expert-led approach. Their curriculum, blending theory with real-world strategies,
                                    stands out in preparing individuals for success in financial markets.</p>
									</div>

								</div>
							</div>
							<div className="col-md-8 col-lg-7">
								<div className="row">
									<div className="r1 col-md-3 mb-md-0 mb-4 border-left">
										<h2 className="footer-heading">Quick Links</h2>
										<ul className="list-unstyled">

											<li><a href="#" style={{ textDecoration: 'none' }} className="py-1 d-block">About</a></li>
											<li><a href="#stock" style={{ textDecoration: 'none' }} className="py-1 d-block">Stock Education


</a></li>
											<li><a href="#forex" style={{ textDecoration: 'none' }} className="py-1 d-block">Forex Education</a></li>
											<li><a href="#crypto" style={{ textDecoration: 'none' }} className="py-1 d-block">Crypto Education</a></li>
											<li><a href="#web3" style={{ textDecoration: 'none' }} className="py-1 d-block">Web3 Education</a></li>
								
								
										</ul>
									</div>
									<div className="r1 col-md-3 mb-md-0 mb-4 border-left">
										<h2 className="footer-heading">About</h2>
										<ul className="list-unstyled">
										<li><a href="" style={{ textDecoration: 'none' }} className="py-1 d-block">Tokens</a></li>
											<li><a href="#team" style={{ textDecoration: 'none' }} className="py-1 d-block">Staff</a></li>
											<li><a href="#!" style={{ textDecoration: 'none' }} className="py-1 d-block">Location</a></li>
											
											<li><a href="#!" style={{ textDecoration: 'none' }} className="py-1 d-block">Blog</a></li>
										</ul>
									</div>
									<div className="r1 col-md-3 mb-md-0 mb-4 border-left">
										<h2 className="footer-heading">Privacy</h2>
										<ul className="list-unstyled">
											<li><Link style={{ textDecoration: 'none' }} onClick={handleClick2} to="/terms-and-condition" className="py-1 d-block">Terms and condition</Link></li>
											<li><Link to='/privacy-policy' onClick={handleClick} style={{ textDecoration: 'none' }} className="py-1 d-block">Privacy Policy</Link></li>

										</ul>
									</div>
									<div className="r1 col-md-3 mb-md-0 mb-4 border-left">
										<h2 className="footer-heading">Social</h2>
										<ul className="list-unstyled">
											<li><a href="#" style={{ textDecoration: 'none' }} className="py-1 d-block"><img src={social1} alt=""  style={{width:30, marginRight:5, height:30}}/>Facebook</a></li>
											<li><a href="#" style={{ textDecoration: 'none' }} className="py-1 d-block"><img src={social2} alt=""  style={{width:30, marginRight:5, height:30}} />Instagram</a></li>
											<li><a href="#" style={{ textDecoration: 'none' }} className="py-1 d-block"><img src={social3} alt=""  style={{width:30, marginRight:5, height:30}} />Youtube</a></li>
											<li><a href="#" style={{ textDecoration: 'none' }} className="py-1 d-block"><img src={social4} alt=""  style={{width:30, marginRight:5, height:30}} />X</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col-md-6 col-lg-8">


							</div>

						</div>
					</div>
				</footer>
			</div>
  </div>
        </>
    )
}

export default Home