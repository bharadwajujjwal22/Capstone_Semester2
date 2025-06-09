import Footer from "../Components/footer";
import Nav from "../Components/nav";

export default function AboutPage() {
  return (
    <div className=" text-center flex flex-col min-h-screen">
      <Nav />
      <main className="p-10 max-w-3xl mx-auto flex-grow">
        <h1 className="text-3xl font-bold mb-6">Uvenza</h1>
        <h3 className="mb-4">
          Uvenza is your go-to fashion e-commerce platform, offering a curated selection of modern apparel with simplicity and style. We believe in delivering high-quality fashion pieces that fit your lifestyle and budget.
        </h3>
        <h3 className="mb-4">
          Started by a team of passionate designers and techies, Uvenza is committed to making online shopping smooth, secure, and stylish. From the first click to the final checkout — we’ve got you covered.
        </h3>
        <h4 className="text-gray-600 italic">Fashion made simple. Style made personal.</h4>
      </main>
      <Footer />
    </div>
  );
}
