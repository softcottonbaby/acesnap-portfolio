import Layout from "../components/Layout";
import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      title: "Thumbnails",
      items: [
        {
          label: "Consistent Clients",
          price: "$10 / each",
          features: [
            "🔥 Special Promo for regular clients",
            "High-quality YouTube thumbnails",
            "Fast delivery & consistent branding",
          ],
          highlight: true,
        },
        {
          label: "Single Orders",
          price: "$15 / each",
          features: [
            "Perfect for one-time projects",
            "Same high quality design",
            "Quick turnaround",
          ],
        },
      ],
    },
    {
      title: "Banners",
      items: [
        {
          label: "Custom Designs",
          price: "$15 – $30",
          features: [
            "Social media, Twitch, YouTube",
            "Futuristic and eye-catching style",
            "Price depends on size and complexity",
          ],
          highlight: true,
        },
      ],
    },
    {
      title: "Logos",
      items: [
        {
          label: "Basic Personal Logo",
          price: "$30+",
          features: [
            "Clean & modern user branding",
            "Perfect for gamers & creators",
          ],
        },
        {
          label: "Website / Business Logo",
          price: "$50+",
          features: [
            "Professional detailed design",
            "Scalable for websites & print",
          ],
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="w-full text-center select-none">
        {/* Title */}
        <h1 className="text-4xl font-bold text-red-500 mb-4 uppercase">
          MY PRICES
        </h1>
        <p className="text-gray-400 mb-14 max-w-2xl mx-auto">
          Clear pricing for professional designs — flexible to fit your budget.
        </p>

        {/* ✅ Auto-fit Grid (pure CSS) */}
        <div id="pricesGrid" className="max-w-7xl mx-auto w-full px-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className="bg-zinc-900/80 border border-zinc-700 rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center h-full min-w-0"
            >
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-white mb-6 border-b border-zinc-700 pb-2 w-full">
                {plan.title}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-6 w-full">
                {plan.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative p-6 rounded-xl transition-all ${
                      item.highlight
                        ? "gradient-border bg-zinc-800/60"
                        : "border border-zinc-700 bg-zinc-800/40"
                    }`}
                  >
                    {/* Gradient Label */}
                    <p className="font-semibold text-lg mb-2 bg-gradient-to-r from-red-700 via-red-500 to-red-400 bg-clip-text text-transparent">
                      {item.label}
                    </p>

                    {/* Price */}
                    <div className="text-xl font-extrabold text-white mb-3">
                      {item.price}
                    </div>

                    {/* Features */}
                    <ul className="text-gray-300 text-sm space-y-2">
                      {item.features.map((f, fidx) => (
                        <li key={fidx} className="flex items-start">
                          <span className="mr-2 text-white font-bold">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Best Deal Tag */}
                    {item.highlight && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-red-700 via-red-500 to-red-400">
                        Best Deal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Fluid, auto-fitting grid: as many columns as fit at ≥ 300px each */
        #pricesGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem; /* ~ Tailwind gap-10 */
          align-items: stretch;
        }

        /* Gradient Border Utility (unchanged) */
        .gradient-border {
          border: 1px solid transparent;
          background-image: linear-gradient(to right, #18181b, #18181b),
            linear-gradient(to right, #b91c1c, #ef4444, #f87171);
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }
      `}</style>
    </Layout>
  );
}
