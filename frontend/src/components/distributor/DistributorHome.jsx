import { Link } from "react-router-dom";
import Navbar from "../reusable/Navbar";
import Footer from "../reusable/Footer";
import DistributorLogoClipArt from "../../assets/images/istockphoto-947202598-612x612.jpg";

const DistributorHome = () => {
    return (
        <div className="h-full w-full mx-auto p-6 max-w-7xl">
            <Navbar primary={{title: "Home", link: "/"}} secondary={{title: "Supplier", link: "/supplier"}} />

            <main>
                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-1 items-center mx-auto max-w-3xl">
                    <div className="md:col-span-2 text-5xl font-bold text-left">
                        <div>LET US</div>
                        <div>HELP GROW</div>
                        <div>YOUR BUSINESS</div>
                    </div>
                    <div>
                        <img className="w-60 rounded-full" src={DistributorLogoClipArt} alt="Supplier Logo Clip Art" />
                    </div>
                </div>
                <div className="mt-28 w-full text-2xl text-center">
                    <p>Expand your reach with a <b>nationwide network.</b></p>
                    <p className="mt-2">Access to <b>top-quality products and best prices.</b></p>
                    <p className="mt-2">Better service, rapid payments, and no cancellations.</p>
                    <p className="mt-2">Build your business with a <b>reliable partner.</b></p>
                    <p className="mt-2"><b>Join our platform and increase your revenue.</b></p>
                </div>
                <div className="mt-20 w-full">
                    <Link to="register" className="text-5xl lg:text-7xl font-bold">/register</Link>
                </div>
                <div className="mt-32 w-full">
                    <h1 className="text-3xl font-bold text-center">What's in it for you? And Why should you choose us?</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto my-4 p-8 text-left">
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Join our network of trusted distributors today.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Reach a wider audience with our platform.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Get access to exclusive distributor resources.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Boost your sales and increase revenue.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Enjoy fast, reliable payments for your orders.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Access a wide range of high-quality products.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> No more struggles to find new customers.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Say goodbye to supply chain headaches.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Enjoy better visibility in your local market.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Get the support you need to succeed.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Take your business to the next level.</p>
                        <p className="py-4 px-6 text-xl"><i className="fal fa-check text-green-600 mr-2"></i> Join a community of successful distributors.</p>
                    </div>
                </div>
                <div className="mt-28 w-full text-left">
                    <h1 className="flex items-center gap-4 text-3xl font-bold"><span>Terms & Guidelines</span><i className="fal fa-long-arrow-right inline-block translate-y-0.5"></i></h1>
                    <ol className="mt-12 px-12 text-lg list-disc">
                        <li>We act solely as a connecting platform between you and potential customers. We are not responsible for the quality or safety of your products or services.</li>
                        <li>You must provide accurate and up-to-date information about your business and products/services to ensure that potential customers can make informed decisions.</li>
                        <li>You must comply with all applicable laws and regulations governing your business, including but not limited to those relating to health and safety, environmental protection, and labor practices.</li>
                        <li>You are solely responsible for the content you provide on our platform, including product descriptions, pricing, and images. You agree to indemnify and hold us harmless from any liability arising from such content.</li>
                        <li>We reserve the right to remove any content that violates these terms and conditions or that we deem inappropriate or offensive.</li>
                        <li>We may terminate your account at any time if we believe you have violated these terms and conditions or for any other reason.</li>
                        <li>You agree to pay any fees associated with the use of our platform, as described in our pricing policy.</li>
                        <li>We may modify these terms and conditions at any time, and such modifications will become effective upon posting on our platform.</li>
                        <li>We are not liable for any loss or damage that may result from the use of our platform or any errors or omissions in our content.</li>
                        <li>By using our platform, you agree to release us from any claims or disputes arising from your use of our platform or your interactions with potential customers.</li>
                        <li>You acknowledge that we do not guarantee any specific results or outcomes from the use of our platform.</li>
                        <li>These terms and conditions are governed by the laws of the jurisdiction in which our company is located, and any disputes will be resolved in accordance with such laws.</li>
                    </ol>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default DistributorHome;