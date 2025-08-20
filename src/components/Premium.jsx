import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
  FaCrown,
  FaCheck,
  FaInfinity,
  FaComments,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      setIsUserPremium(res.data.isPremium);
    } catch (error) {
      console.error("Failed to verify premium status", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "TEKLYNC",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#6B46C1",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-400">Loading your premium status...</p>
        </div>
      </div>
    );
  }

  if (isUserPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCrown className="text-white text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Premium Member!
          </h1>
          <p className="text-xl mb-6">
            Thanks for being part of TekLync Premium
          </p>
        </div>

        <div className="max-w-lg bg-base-100 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Premium Benefits:</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <FaComments className="text-primary mr-3" />
              <span>Unlimited chat connections</span>
            </div>
            <div className="flex items-center">
              <FaInfinity className="text-primary mr-3" />
              <span>Infinite connection requests</span>
            </div>
            <div className="flex items-center">
              <FaShieldAlt className="text-primary mr-3" />
              <span>Verified profile badge</span>
            </div>
            <div className="flex items-center">
              <FaBolt className="text-primary mr-3" />
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const FeatureItem = ({ icon, text }) => (
    <div className="flex items-start mb-3">
      <span className="text-primary mr-2 mt-1">{icon}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-primary">Tek</span>
          <span className="text-secondary">Lync</span> Premium
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Unlock the full potential of developer networking with premium
          features
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
        {/* Silver Membership */}
        <div className="card bg-base-100 rounded-2xl p-8 w-full max-w-md border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary flex items-center">
                <FaCrown className="mr-2 text-yellow-400" />
                Silver
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Perfect for getting started
              </p>
            </div>
            <div className="bg-primary/10 px-4 py-1 rounded-full">
              <span className="text-primary font-bold">₹499</span>
              <span className="text-gray-500 text-sm">/3mo</span>
            </div>
          </div>

          <div className="mb-8">
            <FeatureItem
              icon={<FaComments />}
              text="Chat with other developers"
            />
            <FeatureItem
              icon={<FaInfinity />}
              text="100 connection requests per day"
            />
            <FeatureItem icon={<FaShieldAlt />} text="Verified profile badge" />
            <FeatureItem icon={<FaCheck />} text="3 months access" />
          </div>

          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-primary w-full hover:scale-[1.02] transition-transform"
          >
            Get Silver
          </button>
        </div>

        <div className="relative my-8 lg:my-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-full bg-gray-300 lg:block hidden"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 py-2 bg-base-100 rounded-full border border-gray-300 text-sm font-medium shadow-sm">
              MOST POPULAR
            </div>
          </div>
        </div>

        {/* Gold Membership */}
        <div className="card bg-gradient-to-br from-base-100 to-secondary/10 rounded-2xl p-8 w-full max-w-md border-2 border-secondary/30 hover:border-secondary/50 transition-all duration-300 shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
            BEST VALUE
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary flex items-center">
                <FaCrown className="mr-2 text-yellow-400" />
                Gold
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                For serious networkers
              </p>
            </div>
            <div className="bg-secondary/10 px-4 py-1 rounded-full">
              <span className="text-secondary font-bold">₹899</span>
              <span className="text-gray-500 text-sm">/6mo</span>
            </div>
          </div>

          <div className="mb-8">
            <FeatureItem
              icon={<FaComments />}
              text="Unlimited chat connections"
            />
            <FeatureItem
              icon={<FaInfinity />}
              text="Infinite connection requests"
            />
            <FeatureItem icon={<FaShieldAlt />} text="Verified profile badge" />
            <FeatureItem icon={<FaBolt />} text="Priority support access" />
            <FeatureItem icon={<FaCheck />} text="6 months access" />
          </div>

          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-secondary w-full hover:scale-[1.02] transition-transform"
          >
            Get Gold
          </button>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Why Go Premium?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 p-6 rounded-xl border border-base-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaComments className="text-primary text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expand Your Network</h3>
            <p className="text-gray-600">
              Connect with more developers and tech professionals daily
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-xl border border-base-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaShieldAlt className="text-primary text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Profile</h3>
            <p className="text-gray-600">
              Stand out with a verified badge that builds trust
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-xl border border-base-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaBolt className="text-primary text-xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Priority Support</h3>
            <p className="text-gray-600">
              Get faster responses and dedicated help when you need it
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center p-6 bg-base-100 rounded-xl border border-base-300">
        <h3 className="text-xl font-semibold mb-4">
          Secure & Trusted Payments
        </h3>
        <p className="text-gray-600 mb-2">
          All payments are processed securely through Razorpay. Your financial
          information is never stored on our servers.
        </p>
        <p className="text-sm text-gray-500">
          Cancel anytime. 7-day money back guarantee for new subscriptions.
        </p>
      </div>
    </div>
  );
};

export default Premium;
