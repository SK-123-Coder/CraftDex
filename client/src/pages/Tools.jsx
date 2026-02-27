// dependency
import React from 'react'
import { motion } from "framer-motion";

// Components
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"

// Cards Data
import productsCardsData from '../data/For_Tools&ProductsCards/Products.DataCard'
import toolsCardsData from '../data/For_Tools&ProductsCards/Tools.DataCard'

// Cards
import ProductsCard from '../components/ProductsCard'
import ToolsCard from '../components/ToolsCard'

function Tools(){
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gray-900"   // or same as page background
        >
            <Navbar />
            
            {/* Product and Tools section */}
            <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-20 md:py-28 overflow-hidden">

            {/* Soft background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_45%)] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

                {/* Section Heading */}
                <div className="text-center mb-16 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    Explore Our{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Powerful Tools
                    </span>
                </h2>

                <p className="text-gray-400 max-w-2xl mx-auto mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
                    Simplify your workflow with our online tools — designed to be{" "}
                    <span className="text-blue-400 font-medium">fast</span>,{" "}
                    <span className="text-cyan-300 font-medium">reliable</span>, and{" "}
                    <span className="text-blue-400 font-medium">user-friendly</span>.
                </p>
                </div>

                {/* Products Grid */}
                <div className="mb-24 md:mb-28">
                <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-gray-100">
                    Products
                </h3>

                <div className="flex justify-center">
                    {productsCardsData.map((item) => (
                    <ProductsCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        image_alt={item.image_alt}
                        state={item.state}
                        link={item.link}
                    />
                    ))}
                </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-20" />

                {/* Tools Grid */}
                <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-gray-100">
                    Tools
                </h3>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {toolsCardsData.map((item) => (
                    <ToolsCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        image_alt={item.image_alt}
                        state={item.state}
                        link={item.link}
                    />
                    ))}
                </div>
                </div>

            </div>
            </section>

            <Footer />
        </motion.div>
    )
}

export default React.memo(Tools);