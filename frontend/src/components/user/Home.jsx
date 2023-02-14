import { Link } from "react-router-dom";
import LogoClipArt from "../../assets/images/istockphoto-1283854311-612x612.jpg";
import Navbar from "../reusable/Navbar";
import Footer from "../reusable/Footer";

const Home = () => {
    return (
        <div className="h-full w-full mx-auto p-6 max-w-7xl">
            <Navbar primary={{title: "Supplier", link: "/supplier"}} secondary={{title: "Distributor", link: "/distributor"}} />

            <main>
                <div className="grid grid-rows-3 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                    <div className="text-4xl font-bold text-left">
                        <div>NO MORE</div>
                        <div>WAITING IN LINE</div>
                        <div>FOR YOUR LPG ORDER</div>
                    </div>
                    <div className="flex-1">
                        <img className="inline-block w-40 xl:w-48 rounded-full" src={LogoClipArt} alt="Logo Clip Art" />
                    </div>
                    <div className="text-4xl font-bold text-right">
                        <div>GET YOUR ORDER</div>
                        <div>AT BEST PRICE</div>
                        <div>POSSIBLE</div>
                    </div>
                </div>
                <div className="mt-36 w-full text-2xl text-center">
                    <p>We got together with the <b>best of LPG Suppliers</b> and the <b>best of Distributors</b> in every corner of the country.</p>
                    <p className="mt-2">So that <b>you don't have to worry</b> about which of them is best for you.</p>
                    <p className="mt-2"><b>Let us take care of that.</b> You just have to...</p>
                </div>
                <div className="mt-20 w-full">
                    <Link to="register" className="text-5xl lg:text-7xl font-bold">/register</Link>
                </div>
                <div className="mt-32 w-full">
                    <h1 className="text-3xl font-bold text-center">What's in it for you? And Why should you choose us?</h1>
                    <div className="flex flex-wrap gap-8 justify-center items-center my-4 p-8">                        
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> Assured quality check of every order.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> Wide network of Distributors.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> Best price in the market.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> No more waiting in line.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> No more waiting for your order.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> Rapid fast payments.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> No worriesome order cancellation.</p>
                        <p className="text-xl mb-2"><i className="fal fa-check text-green-600 mr-2"></i> Under 2 day delivery.</p>
                    </div>
                </div>
                <div className="mt-28 w-full text-left">
                    <h1 className="flex items-center gap-4 text-3xl font-bold"><span>Let's clear the air</span><i className="fal fa-long-arrow-right inline-block translate-y-0.5"></i></h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-6 md:grid-rows-3 lg:grid-rows-2 gap-10 p-8">
                        <div>
                            <p className="text-xl mb-2">What we are not?</p>
                            <p>We are a platform that connects LPG Suppliers and Distributors with the end users.</p>
                        </div>
                        <div>
                            <p className="text-xl mb-2">What we are?</p>
                            <p>We are not a supplier or a distributor ourselves.</p>
                        </div>
                        <div>
                            <p className="text-xl mb-2">What we do?</p>
                            <p>We are a platform that connects the two with you to meet your demands.</p>
                        </div>
                        <div>
                            <p className="text-xl mb-2">What we achieve by doing so?</p>
                            <p>We are able to maintain the price in the market.</p>
                        </div>
                        <div>
                            <p className="text-xl mb-2">How long it takes to get your order delivered?</p>
                            <p>The wide network of Distributors which promises to deliver you order within 2 days.</p>
                        </div>
                        <div>
                            <p className="text-xl mb-2">What we get from doing this?</p>
                            <p>We also are able to gain a little capital from this venture. But more importantly we diminish the monopoly over this market</p>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Home;