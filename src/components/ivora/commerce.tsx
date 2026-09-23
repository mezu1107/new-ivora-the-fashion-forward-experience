import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  articles,
  campaignImages,
  categories,
  colors,
  formatPrice,
  heroSlides,
  moods,
  products,
  productsForMood,
  recommendProducts,
  sizes,
  type Product,
} from "@/lib/ivora-data";
import { useIvoraStore, type CartItem, type Order } from "@/lib/ivora-store";

export function SiteChrome() {
  return (
    <>
      <Navbar />
      <SearchOverlay />
      <CartDrawer />
      <MiniCart />
    </>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const groups = [
    ["Shop", "New Arrivals", "Men", "Women", "Unisex", "Accessories"],
    ["About", "Our Story", "Journal", "Contact"],
    ["Support", "Shipping", "Returns", "Size Guide", "FAQs"],
    ["Legal", "Privacy", "Terms"],
  ];

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_2fr_1.2fr] lg:px-12">
        <div>
          <Link to="/" className="font-display text-4xl tracking-[0.18em] focus-ivora">
            IVORA
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            Modern essentials focused on clean silhouettes, thoughtful details and effortless style.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <a className="focus-ivora" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="focus-ivora" href="https://tiktok.com" target="_blank" rel="noreferrer">
              TikTok
            </a>
            <a className="focus-ivora" href="https://pinterest.com" target="_blank" rel="noreferrer">
              Pinterest
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {groups.map((group) => (
            <div key={group[0]}>
              <h3 className="editorial-label text-foreground">{group[0]}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {group.slice(1).map((item) => (
                  <li key={item}>
                    <Link className="focus-ivora hover:text-foreground" to={linkForFooter(item)}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <form
          className="lg:max-w-sm"
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim()) setDone(true);
          }}
        >
          <h3 className="font-display text-3xl">JOIN THE IVORA WORLD</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Get first access to new collections, exclusive drops and stories from IVORA.
          </p>
          <div className="mt-6 flex gap-2 border-b border-border pb-2">
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground focus-ivora"
            />
            <Button type="submit" variant="ghost" size="sm">
              Subscribe
            </Button>
          </div>
          {done ? <p className="mt-3 text-sm text-sage">You are now part of the IVORA world.</p> : null}
        </form>
      </div>
    </footer>
  );
}

function linkForFooter(item: string) {
  if (["Journal"].includes(item)) return "/journal";
  if (["Our Story"].includes(item)) return "/about";
  if (["New Arrivals", "Men", "Women", "Unisex", "Accessories", "Shipping", "Returns", "Size Guide", "FAQs"].includes(item)) return "/shop";
  if (["Privacy", "Terms"].includes(item)) return "/about";
  if (item === "Contact") return "/contact";
  return "/shop";
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSearch, openCart, cartCount, wishlist } = useIvoraStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    ["New Arrivals", "/shop"],
    ["Shop", "/shop"],
    ["Collections", "/collections"],
    ["Journal", "/journal"],
    ["About", "/about"],
  ] as const;

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 py-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full transition-all duration-300 ${
          scrolled ? "glass-panel-strong px-4 py-2" : "glass-panel px-4 py-3"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-7">
          <Link to="/" className="font-display text-2xl tracking-[0.2em] focus-ivora sm:text-3xl">
            IVORA
          </Link>
          <div className="hidden items-center gap-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground lg:flex">
            {navItems.map(([label, path]) => (
              <Link key={label} to={path} className="focus-ivora hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" onClick={openSearch} aria-label="Search IVORA">
            Search
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/wishlist">Wishlist {wishlist.length ? `(${wishlist.length})` : ""}</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={openCart} aria-label="Open cart">
            Cart {cartCount ? `(${cartCount})` : ""}
          </Button>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" onClick={openSearch} aria-label="Search IVORA">
            <Search />
          </Button>
          <Button variant="ghost" size="icon" onClick={openCart} aria-label="Open cart">
            <ShoppingBag />
            <span className="sr-only">{cartCount} items</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </Button>
        </div>
      </nav>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto flex h-full w-[88%] max-w-sm flex-col glass-panel-strong p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl tracking-[0.2em]">IVORA</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X />
              </Button>
            </div>
            <div className="mt-12 flex flex-col gap-6 text-lg uppercase tracking-[0.16em]">
              {[...navItems, ["Wishlist", "/wishlist"] as const, ["Contact", "/contact"] as const].map(([label, path]) => (
                <Link key={label} to={path} onClick={() => setMobileOpen(false)} className="focus-ivora">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function HomePage() {
  const [activeMood, setActiveMood] = useState<(typeof moods)[number]>("Minimal");
  const moodProducts = productsForMood(activeMood);
  const newArrivals = products.filter((product) => product.newArrival).slice(0, 8);

  return (
    <main>
      <HeroCarousel />
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader label="New Arrivals" title="Recently arrived at IVORA" action={<LinkText to="/shop">Shop all</LinkText>} />
        <ProductGrid products={newArrivals} />
      </section>
      <CategorySection />
      <EditorialBanner />
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader label="What's your mood?" title="Dress by intention" />
        <div className="grid gap-4 md:grid-cols-4">
          {moods.map((mood, index) => (
            <button
              key={mood}
              onClick={() => setActiveMood(mood)}
              className={`group relative min-h-[360px] overflow-hidden rounded-sm focus-ivora ${activeMood === mood ? "ring-2 ring-sage" : ""}`}
            >
              <img
                src={[campaignImages.one, campaignImages.three, campaignImages.two, campaignImages.four][index]}
                alt={`${mood} IVORA mood`}
                width={1600}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-primary/25" />
              <span className="absolute bottom-5 left-5 rounded-full glass-panel px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                {mood}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
          {moodProducts.map((product) => (
            <CompactProduct key={product.id} product={product} />
          ))}
        </div>
      </section>
      <FeaturedProducts />
      <BuildYourLook />
      <JournalPreview />
      <AboutPreview />
      <NewsletterBand />
    </main>
  );
}

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slide = heroSlides[index];

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const go = (direction: number) => setIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);

  return (
    <section
      className="relative min-h-screen overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:px-12"
      onTouchStart={(event) => (touchStart.current = event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        if (touchStart.current - end > 40) go(1);
        if (end - touchStart.current > 40) go(-1);
        touchStart.current = null;
      }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1500px] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div className="z-10 max-w-2xl pb-6 lg:pb-16">
          <p className="editorial-label">{slide.label}</p>
          <h1 className="mt-4 max-w-xl font-display text-6xl leading-[0.86] sm:text-8xl lg:text-[8.8rem]">{slide.headline}</h1>
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground">{slide.product}</p>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">{slide.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="editorial" size="lg">
              <Link to={slide.ctaPath}>
                {slide.cta}
              </Link>
            </Button>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{String(index + 1).padStart(2, "0")} / 03</span>
          </div>
        </div>
        <div className="relative min-h-[54vh] overflow-hidden rounded-sm lg:min-h-[76vh]">
          {heroSlides.map((hero, heroIndex) => (
            <img
              key={hero.headline}
              src={hero.image}
              alt={`${hero.product} campaign`}
              width={1600}
              height={1200}
              loading={heroIndex === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroIndex === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute bottom-5 right-5 flex gap-2">
            <Button variant="glass" size="icon" onClick={() => go(-1)} aria-label="Previous hero slide">
              <ArrowLeft />
            </Button>
            <Button variant="glass" size="icon" onClick={() => go(1)} aria-label="Next hero slide">
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ label, title, action }: { label: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        <p className="editorial-label">{label}</p>
        <h2 className="mt-2 font-display text-4xl leading-tight sm:text-6xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function LinkText({ to, children }: { to: "/shop" | "/journal" | "/about" | "/collections"; children: React.ReactNode }) {
  return (
    <Link to={to} className="focus-ivora text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
      {children}
    </Link>
  );
}

export function ProductGrid({ products: shownProducts }: { products: Product[] }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">{shownProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useIvoraStore();
  const wished = isWishlisted(product.id);
  return (
    <article className="group relative">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="focus-ivora block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
          <img src={product.images[0]} alt={product.name} width={900} height={1200} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
          <img src={product.images[1]} alt={`${product.name} alternate view`} width={900} height={1200} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.newArrival ? <Badge>NEW</Badge> : null}
            {product.bestSeller ? <Badge>BESTSELLER</Badge> : null}
            {product.stock < 8 ? <Badge>LOW STOCK</Badge> : null}
          </div>
        </div>
      </Link>
      <Button
        variant="glass"
        size="icon"
        className="absolute right-3 top-3 h-9 w-9"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      >
        <Heart className={wished ? "fill-current text-sage" : ""} />
      </Button>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to="/product/$slug" params={{ slug: product.slug }} className="focus-ivora text-sm font-semibold hover:text-sage">
            {product.name}
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{product.colors[0]}</p>
        </div>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100" onClick={() => addToCart(product)}>
        Quick Add
      </Button>
    </article>
  );
}

function CompactProduct({ product }: { product: Product }) {
  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="group focus-ivora block">
      <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        <img src={product.images[0]} alt={product.name} width={600} height={750} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <p className="mt-3 text-sm font-semibold">{product.name}</p>
      <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
    </Link>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full glass-panel px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]">{children}</span>;
}

function CategorySection() {
  const categoryImages = [campaignImages.three, campaignImages.one, campaignImages.two, campaignImages.four];
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeader label="Shop by Category" title="Four ways into IVORA" />
        <div className="grid gap-4 md:grid-cols-4">
          {["Men", "Women", "Unisex", "Accessories"].map((category, index) => (
            <Link key={category} to="/shop" className="group focus-ivora relative min-h-[430px] overflow-hidden rounded-sm">
              <img src={categoryImages[index]} alt={`${category} IVORA category`} width={900} height={1200} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
              <span className="absolute inset-0 bg-primary/20 transition-colors group-hover:bg-primary/30" />
              <span className="absolute bottom-5 left-5 text-background">
                <span className="block font-display text-4xl">{category}</span>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em]">Explore</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialBanner() {
  return (
    <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
      <div className="flex flex-col justify-center py-8">
        <p className="editorial-label">Featured Collection</p>
        <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">THE IVORA COLLECTION</h2>
        <p className="mt-6 max-w-md leading-7 text-muted-foreground">Modern essentials designed around clean silhouettes, refined details and effortless everyday style.</p>
        <Button asChild variant="editorial" size="lg" className="mt-8 w-fit">
          <Link to="/collections">Explore Collection</Link>
        </Button>
      </div>
      <img src={campaignImages.one} alt="THE IVORA COLLECTION" width={1600} height={1200} loading="lazy" className="min-h-[520px] w-full rounded-sm object-cover" />
    </section>
  );
}

function FeaturedProducts() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const large = featured[0];
  const rest = featured.slice(1);
  if (!large) return null;
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <SectionHeader label="Featured Products" title="An editorial edit" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Link to="/product/$slug" params={{ slug: large.slug }} className="group focus-ivora relative min-h-[640px] overflow-hidden rounded-sm">
            <img src={large.images[0]} alt={large.name} width={1200} height={1400} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
            <div className="absolute bottom-6 left-6 rounded-sm glass-panel p-5">
              <p className="editorial-label">Signature piece</p>
              <h3 className="mt-2 font-display text-4xl">{large.name}</h3>
              <p className="mt-2 text-sm">{formatPrice(large.price)}</p>
            </div>
          </Link>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <img src={campaignImages.four} alt="IVORA accessories edit" width={1600} height={1200} loading="lazy" className="hidden min-h-[300px] rounded-sm object-cover lg:block" />
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-3">
              {rest.map((product) => (
                <CompactProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BuildYourLook() {
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const { addManyToCart } = useIvoraStore();
  const selected = products.find((product) => product.id === selectedId) ?? products[0];
  if (!selected) return null;
  const recommendations = recommendProducts(selected, 4);
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
      <div className="grid gap-8 rounded-sm glass-panel-strong p-5 sm:p-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="editorial-label">Build Your Look</p>
          <h2 className="mt-3 font-display text-5xl leading-none">SELECT YOUR PIECE</h2>
          <label className="mt-8 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground" htmlFor="look-piece">
            Piece
          </label>
          <select id="look-piece" value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="mt-3 w-full rounded-full border border-border bg-secondary px-4 py-3 text-sm focus-ivora">
            {products.slice(0, 12).map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <Button variant="editorial" className="mt-6" onClick={() => addManyToCart([selected, ...recommendations].map((product) => ({ product })))}>
            Add Complete Look
          </Button>
        </div>
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Complete the look</p>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
            {[selected, ...recommendations].map((product) => (
              <CompactProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalPreview() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
      <SectionHeader label="The IVORA Journal" title="Notes on modern dressing" action={<LinkText to="/journal">Read journal</LinkText>} />
      <div className="grid gap-6 md:grid-cols-4">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <img src={campaignImages.two} alt="IVORA everyday design story" width={1600} height={1200} loading="lazy" className="min-h-[520px] w-full rounded-sm object-cover" />
        <div className="flex flex-col justify-center">
          <p className="editorial-label">About IVORA</p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">DESIGNED FOR EVERYDAY.</h2>
          <p className="mt-6 max-w-md leading-7 text-muted-foreground">IVORA creates modern essentials focused on clean silhouettes, thoughtful details and effortless style.</p>
          <Button asChild variant="outline" className="mt-8 w-fit">
            <Link to="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <form
        className="mx-auto max-w-4xl text-center"
        onSubmit={(event) => {
          event.preventDefault();
          if (email.trim()) setSuccess(true);
        }}
      >
        <p className="editorial-label">Newsletter</p>
        <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">JOIN THE IVORA WORLD</h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">Get first access to new collections, exclusive drops and stories from IVORA.</p>
        <div className="mx-auto mt-8 flex max-w-xl gap-2 border-b border-border pb-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="min-w-0 flex-1 bg-transparent text-center outline-hidden placeholder:text-muted-foreground focus-ivora sm:text-left" />
          <Button type="submit" variant="ghost" size="sm">
            Subscribe
          </Button>
        </div>
        {success ? <p className="mt-4 text-sm text-sage">You are subscribed to IVORA.</p> : null}
      </form>
    </section>
  );
}

export function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <article className="group">
      <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        <img src={article.image} alt={article.title} width={900} height={1125} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
      </div>
      <p className="mt-4 editorial-label">{article.category}</p>
      <h3 className="mt-2 font-display text-3xl leading-tight">{article.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.description}</p>
      <Link to="/journal/$slug" params={{ slug: article.slug }} className="focus-ivora mt-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
        Read
      </Link>
    </article>
  );
}

export function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [price, setPrice] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const matchesQuery = [product.name, product.category, product.description, product.tags.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      const matchesSize = size === "All" || product.sizes.includes(size);
      const matchesColor = color === "All" || product.colors.includes(color);
      const matchesPrice = price === "All" || (price === "Under $100" ? product.price < 100 : price === "$100–$180" ? product.price >= 100 && product.price <= 180 : product.price > 180);
      const matchesAvailability = availability === "All" || (availability === "In Stock" ? product.stock > 0 : product.stock > 0 && product.stock < 8);
      return matchesQuery && matchesCategory && matchesSize && matchesColor && matchesPrice && matchesAvailability;
    });
    if (sort === "Newest") list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [query, category, size, color, price, availability, sort]);

  const filters = (
    <FilterPanel
      query={query}
      setQuery={setQuery}
      category={category}
      setCategory={setCategory}
      size={size}
      setSize={setSize}
      color={color}
      setColor={setColor}
      price={price}
      setPrice={setPrice}
      availability={availability}
      setAvailability={setAvailability}
      sort={sort}
      setSort={setSort}
    />
  );

  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="editorial-label">Shop</p>
          <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">SHOP IVORA</h1>
        </div>
        <p className="text-sm text-muted-foreground">{filtered.length} pieces</p>
      </div>
      <div className="lg:hidden">
        <Button variant="glass" onClick={() => setMobileFilters(true)}>
          <SlidersHorizontal /> Filters
        </Button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <section>
          {filtered.length ? <ProductGrid products={filtered} /> : <p className="py-20 text-center text-muted-foreground">No IVORA products match these filters.</p>}
        </section>
      </div>
      {mobileFilters ? (
        <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto h-full w-[90%] max-w-sm overflow-y-auto glass-panel-strong p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-3xl">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFilters(false)} aria-label="Close filters">
                <X />
              </Button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}
    </main>
  );
}

function FilterPanel(props: {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  size: string;
  setSize: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}) {
  return (
    <div className="sticky top-28 rounded-sm glass-panel p-4">
      <FilterInput label="Search" value={props.query} onChange={props.setQuery} />
      <FilterSelect label="Category" value={props.category} onChange={props.setCategory} options={["All", ...categories]} />
      <FilterSelect label="Size" value={props.size} onChange={props.setSize} options={["All", ...sizes, "36", "37", "38", "39", "40", "41", "42", "43", "44", "ONE SIZE"]} />
      <FilterSelect label="Color" value={props.color} onChange={props.setColor} options={["All", ...colors]} />
      <FilterSelect label="Price" value={props.price} onChange={props.setPrice} options={["All", "Under $100", "$100–$180", "Over $180"]} />
      <FilterSelect label="Availability" value={props.availability} onChange={props.setAvailability} options={["All", "In Stock", "Low Stock"]} />
      <FilterSelect label="Sort" value={props.sort} onChange={props.setSort} options={["Featured", "Newest", "Price: Low to High", "Price: High to Low"]} />
    </div>
  );
}

function FilterInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mb-4 block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-full border border-border bg-secondary px-4 py-3 text-sm focus-ivora" placeholder="Search IVORA" />
    </label>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="mb-4 block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <span className="relative mt-2 block">
        <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-full border border-border bg-secondary px-4 py-3 pr-10 text-sm focus-ivora">
          {Array.from(new Set(options)).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}

export function ProductDetailPage({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "ONE SIZE");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "Ivory");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addToCart, addManyToCart, toggleWishlist, isWishlisted } = useIvoraStore();
  const navigate = useNavigate();
  const recommendations = recommendProducts(product, 3);
  const wished = isWishlisted(product.id);

  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <ProductGallery product={product} />
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="editorial-label">{product.category}</p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl">{product.name}</h1>
          <p className="mt-5 text-xl">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-lg leading-7 text-muted-foreground">{product.description}</p>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Color: {selectedColor}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <Button key={color} variant={selectedColor === color ? "editorial" : "outline"} size="chip" onClick={() => setSelectedColor(color)}>
                  {color}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Size</p>
              <button onClick={() => setSizeGuideOpen(true)} className="focus-ivora text-xs uppercase tracking-[0.16em] text-muted-foreground underline underline-offset-4">
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button key={size} variant={selectedSize === size ? "editorial" : "outline"} size="chip" onClick={() => setSelectedSize(size)}>
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{product.stock < 8 ? `LOW STOCK — ${product.stock} LEFT` : "IN STOCK"}</p>
          <div className="mt-6 flex items-center gap-3">
            <Quantity value={quantity} onChange={setQuantity} />
            <Button variant="editorial" className="flex-1" onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}>
              Add to Cart
            </Button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              variant="sage"
              onClick={() => {
                addToCart(product, selectedSize, selectedColor, quantity);
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </Button>
            <Button variant="outline" onClick={() => toggleWishlist(product.id)}>
              <Heart className={wished ? "fill-current text-sage" : ""} /> Wishlist
            </Button>
          </div>
          <ProductAccordions product={product} />
        </aside>
      </div>
      <section className="mt-20">
        <SectionHeader label="Complete the Look" title="Wear it with" />
        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          <div className="rounded-sm glass-panel p-5">
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">Recommended with pieces that share tone, silhouette and IVORA styling tags.</p>
            <Button className="mt-6" variant="editorial" onClick={() => addManyToCart([product, ...recommendations].map((item) => ({ product: item })))}>
              Add Complete Look
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {recommendations.map((item) => (
              <LookProduct key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
      {sizeGuideOpen ? <SizeGuide onClose={() => setSizeGuideOpen(false)} /> : null}
    </main>
  );
}

function ProductGallery({ product }: { product: Product }) {
  const [image, setImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const touchStart = useRef<number | null>(null);
  return (
    <div
      onTouchStart={(event) => (touchStart.current = event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        if (touchStart.current - end > 40) setImage((current) => (current + 1) % product.images.length);
        if (end - touchStart.current > 40) setImage((current) => (current - 1 + product.images.length) % product.images.length);
        touchStart.current = null;
      }}
    >
      <button className="group aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted focus-ivora" onClick={() => setZoom((value) => !value)} aria-label="Zoom product image">
        <img src={product.images[image]} alt={product.name} width={1200} height={1500} className={`h-full w-full object-cover transition-transform duration-500 ${zoom ? "scale-125" : "group-hover:scale-[1.03]"}`} />
      </button>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {product.images.map((src, index) => (
          <button key={src} onClick={() => setImage(index)} className={`aspect-[4/5] overflow-hidden rounded-sm focus-ivora ${index === image ? "ring-2 ring-sage" : ""}`} aria-label={`Show image ${index + 1}`}>
            <img src={src} alt={`${product.name} thumbnail ${index + 1}`} width={320} height={400} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductAccordions({ product }: { product: Product }) {
  const rows = [
    ["Description", product.description],
    ["The Fit", product.fit],
    ["Material", product.material],
    ["Care", product.care],
    ["Delivery", "Complimentary delivery on orders over $250. Standard delivery arrives in 3–5 business days."],
    ["Returns", "Returns are accepted within 14 days on unworn IVORA pieces with original tags attached."],
  ];
  return (
    <div className="mt-8 border-t border-border">
      {rows.map(([title, body]) => (
        <details key={title} className="group border-b border-border py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.18em]">
            {title}
            <Plus className="size-4 transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
        </details>
      ))}
    </div>
  );
}

function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex h-11 items-center rounded-full border border-border bg-secondary">
      <Button variant="ghost" size="icon" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">
        <Minus />
      </Button>
      <span className="w-8 text-center text-sm">{value}</span>
      <Button variant="ghost" size="icon" onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <Plus />
      </Button>
    </div>
  );
}

function LookProduct({ product }: { product: Product }) {
  const { addToCart } = useIvoraStore();
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 rounded-sm bg-secondary p-3 sm:grid-cols-1">
      <img src={product.images[0]} alt={product.name} width={400} height={500} loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover" />
      <div>
        <Link to="/product/$slug" params={{ slug: product.slug }} className="focus-ivora text-sm font-semibold hover:text-sage">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => addToCart(product)}>
          Add
        </Button>
      </div>
    </div>
  );
}

function SizeGuide({ onClose }: { onClose: () => void }) {
  const rows = [
    ["XS", "32", "24", "24"],
    ["S", "34", "26", "25"],
    ["M", "36", "28", "26"],
    ["L", "38", "30", "27"],
    ["XL", "41", "33", "28"],
    ["XXL", "44", "36", "29"],
  ];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
      <div className="w-full max-w-2xl rounded-sm glass-panel-strong p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="editorial-label">IVORA</p>
            <h2 id="size-guide-title" className="mt-2 font-display text-4xl">Size Guide</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close size guide">
            <X />
          </Button>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="py-3">Size</th>
                <th>Chest</th>
                <th>Waist</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-border">
                  {row.map((cell) => (
                    <td key={cell} className="py-3">{cell} in</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em]">How to measure</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Measure chest around the fullest point, waist at the natural crease and length from shoulder point to hem. Keep tape relaxed for an IVORA fit.</p>
      </div>
    </div>
  );
}

function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useIvoraStore();
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query.trim()) return products.slice(0, 6);
    return products
      .filter((product) => [product.name, product.category, product.tags.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [query]);
  useEffect(() => {
    if (isSearchOpen) setQuery("");
  }, [isSearchOpen]);
  if (!isSearchOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <div className="mx-auto mt-6 max-w-4xl rounded-sm glass-panel-strong p-5 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="editorial-label">Search</p>
            <h2 id="search-title" className="mt-2 font-display text-5xl">SEARCH IVORA</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeSearch} aria-label="Close search">
            <X />
          </Button>
        </div>
        <label className="mt-8 block">
          <span className="sr-only">Search products</span>
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try jacket, trouser or sage" className="w-full border-b border-border bg-transparent py-4 text-2xl outline-hidden placeholder:text-muted-foreground focus-ivora" />
        </label>
        <div className="mt-8 grid gap-3">
          {results.map((product) => (
            <Link key={product.id} to="/product/$slug" params={{ slug: product.slug }} onClick={closeSearch} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 rounded-sm p-2 transition-colors hover:bg-secondary focus-ivora">
              <img src={product.images[0]} alt={product.name} width={144} height={180} loading="lazy" className="aspect-[4/5] rounded-sm object-cover" />
              <span>
                <span className="block text-sm font-semibold">{product.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-muted-foreground">{product.category}</span>
              </span>
              <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartDrawer() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, cartSubtotal, shipping, cartTotal } = useIvoraStore();
  if (!isCartOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="ml-auto flex h-full w-full max-w-md flex-col glass-panel-strong">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="editorial-label">IVORA</p>
            <h2 id="cart-title" className="mt-2 font-display text-4xl">Your Bag</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close cart">
            <X />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length ? (
            <div className="space-y-5">
              {cart.map((item) => {
                const product = products.find((candidate) => candidate.id === item.productId);
                if (!product) return null;
                return <CartLine key={`${item.productId}-${item.size}-${item.color}`} item={item} product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />;
              })}
            </div>
          ) : (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-4xl">Your bag is empty</p>
                <Button asChild variant="editorial" className="mt-6" onClick={closeCart}>
                  <Link to="/shop">Explore IVORA</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border p-5">
          <SummaryRow label="Subtotal" value={formatPrice(cartSubtotal)} />
          <SummaryRow label="Shipping" value={shipping ? formatPrice(shipping) : "Complimentary"} />
          <SummaryRow label="Total" value={formatPrice(cartTotal)} strong />
          <Button asChild variant="editorial" className="mt-5 w-full" disabled={!cart.length} onClick={closeCart}>
            <Link to="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CartLine({ item, product, updateQuantity, removeFromCart }: { item: CartItem; product: Product; updateQuantity: (productId: string, size: string, color: string, quantity: number) => void; removeFromCart: (productId: string, size: string, color: string) => void }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4">
      <img src={product.images[0]} alt={product.name} width={192} height={240} loading="lazy" className="aspect-[4/5] rounded-sm object-cover" />
      <div>
        <div className="flex justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.size} / {item.color}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.productId, item.size, item.color)} aria-label={`Remove ${product.name}`}>
            <Trash2 />
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Quantity value={item.quantity} onChange={(quantity) => updateQuantity(item.productId, item.size, item.color, quantity)} />
          <p className="text-sm font-semibold">{formatPrice(product.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}

function MiniCart() {
  const { miniCart, openCart, dismissMiniCart } = useIvoraStore();
  if (!miniCart) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm rounded-sm glass-panel-strong p-4 shadow-sm">
      <p className="editorial-label text-foreground">Added to your bag</p>
      <div className="mt-3 grid grid-cols-[72px_1fr] gap-3">
        <img src={miniCart.images[0]} alt={miniCart.name} width={144} height={180} loading="lazy" className="aspect-[4/5] rounded-sm object-cover" />
        <div>
          <p className="text-sm font-semibold">{miniCart.name}</p>
          <div className="mt-4 flex gap-2">
            <Button variant="editorial" size="sm" onClick={openCart}>View Bag</Button>
            <Button variant="outline" size="sm" onClick={dismissMiniCart}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between py-2 text-sm ${strong ? "text-base font-semibold" : "text-muted-foreground"}`}><span>{label}</span><span>{value}</span></div>;
}

export function WishlistPage() {
  const { wishlist, moveWishlistToCart, removeWishlist } = useIvoraStore();
  const wished = products.filter((product) => wishlist.includes(product.id));
  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <p className="editorial-label">Wishlist</p>
      <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">YOUR WISHLIST</h1>
      {wished.length ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wished.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="editorial" size="sm" onClick={() => moveWishlistToCart(product)}>Move to cart</Button>
                <Button variant="outline" size="sm" onClick={() => removeWishlist(product.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid min-h-[45vh] place-items-center text-center">
          <div>
            <h2 className="font-display text-4xl">YOUR WISHLIST IS EMPTY</h2>
            <Button asChild variant="editorial" className="mt-6">
              <Link to="/shop">Explore IVORA</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, shipping, cartTotal, createOrder } = useIvoraStore();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order = createOrder({
      customer: {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
      },
      address: {
        address: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""),
        postalCode: String(form.get("postalCode") ?? ""),
        country: String(form.get("country") ?? ""),
      },
      paymentMethod,
      items: cart,
      subtotal: cartSubtotal,
      shipping,
      total: cartTotal,
    });
    navigate({ to: "/order/$id", params: { id: order.id } });
  }

  if (!cart.length) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <h1 className="font-display text-5xl">Your IVORA bag is empty</h1>
          <Button asChild variant="editorial" className="mt-6">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1300px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <p className="editorial-label">Checkout</p>
      <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">IVORA CHECKOUT</h1>
      <form onSubmit={submit} className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          <CheckoutGroup title="Contact">
            <CheckoutInput name="name" label="Name" required />
            <CheckoutInput name="email" label="Email" type="email" required />
            <CheckoutInput name="phone" label="Phone" required />
          </CheckoutGroup>
          <CheckoutGroup title="Delivery">
            <CheckoutInput name="address" label="Address" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <CheckoutInput name="city" label="City" required />
              <CheckoutInput name="postalCode" label="Postal Code" required />
              <CheckoutInput name="country" label="Country" required />
            </div>
          </CheckoutGroup>
          <CheckoutGroup title="Payment">
            <div className="grid gap-3 sm:grid-cols-2">
              {["Cash on Delivery", "Card — Demo"].map((method) => (
                <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`rounded-sm border border-border p-4 text-left text-sm focus-ivora ${paymentMethod === method ? "bg-secondary ring-2 ring-sage" : "bg-transparent"}`}>{method}</button>
              ))}
            </div>
          </CheckoutGroup>
        </div>
        <OrderSummary cart={cart} subtotal={cartSubtotal} shipping={shipping} total={cartTotal} actionLabel="Place Order" />
      </form>
    </main>
  );
}

function CheckoutGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-sm bg-secondary p-5"><h2 className="editorial-label text-foreground">{title}</h2><div className="mt-5 grid gap-4">{children}</div></section>;
}

function CheckoutInput({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <input name={name} type={type} required={required} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus-ivora" />
    </label>
  );
}

function OrderSummary({ cart, subtotal, shipping, total, actionLabel }: { cart: CartItem[]; subtotal: number; shipping: number; total: number; actionLabel?: string }) {
  return (
    <aside className="h-fit rounded-sm glass-panel-strong p-5 lg:sticky lg:top-28">
      <h2 className="font-display text-3xl">Order Summary</h2>
      <div className="mt-5 space-y-4">
        {cart.map((item) => {
          const product = products.find((candidate) => candidate.id === item.productId);
          if (!product) return null;
          return <div key={`${item.productId}-${item.size}-${item.color}`} className="grid grid-cols-[64px_1fr_auto] gap-3 text-sm"><img src={product.images[0]} alt={product.name} width={128} height={160} loading="lazy" className="aspect-[4/5] rounded-sm object-cover" /><span><span className="block font-semibold">{product.name}</span><span className="text-muted-foreground">Qty {item.quantity}</span></span><span>{formatPrice(product.price * item.quantity)}</span></div>;
        })}
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Shipping" value={shipping ? formatPrice(shipping) : "Complimentary"} />
        <SummaryRow label="Total" value={formatPrice(total)} strong />
      </div>
      {actionLabel ? <Button type="submit" variant="editorial" className="mt-5 w-full">{actionLabel}</Button> : null}
    </aside>
  );
}

export function OrderConfirmationPage({ order }: { order?: Order }) {
  if (!order) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <h1 className="font-display text-5xl">Order not found</h1>
          <Button asChild variant="editorial" className="mt-6"><Link to="/track">Track order</Link></Button>
        </div>
      </main>
    );
  }
  const estimated = new Date(Date.parse(order.date) + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="rounded-sm bg-secondary p-6 text-center sm:p-10">
        <p className="mx-auto grid size-12 place-items-center rounded-full bg-sage text-sage-foreground"><Check /></p>
        <p className="mt-6 editorial-label">{order.id}</p>
        <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">ORDER CONFIRMED</h1>
        <p className="mt-5 text-muted-foreground">Thank you for choosing IVORA.</p>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <OrderSummary cart={order.items} subtotal={order.subtotal} shipping={order.shipping} total={order.total} />
        <aside className="rounded-sm glass-panel p-5 text-sm leading-7 text-muted-foreground">
          <h2 className="font-display text-3xl text-foreground">Delivery</h2>
          <p className="mt-4">{order.address.address}</p>
          <p>{order.address.city}, {order.address.postalCode}</p>
          <p>{order.address.country}</p>
          <p className="mt-4">Payment: {order.paymentMethod}</p>
          <p>Estimated delivery: {estimated}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="editorial"><Link to="/track">Track Order</Link></Button>
            <Button asChild variant="outline"><Link to="/shop">Continue Shopping</Link></Button>
          </div>
        </aside>
      </div>
    </main>
  );
}

export function TrackOrderPage() {
  const { findOrder, orders } = useIvoraStore();
  const [orderId, setOrderId] = useState(orders[0]?.id ?? "");
  const [searched, setSearched] = useState(false);
  const order = searched ? findOrder(orderId) : undefined;
  const steps = ["CONFIRMED", "PROCESSING", "SHIPPED", "OUT FOR DELIVERY", "DELIVERED"];
  return (
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <p className="editorial-label">Order Tracking</p>
      <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">TRACK YOUR IVORA ORDER</h1>
      <div className="mt-10 rounded-sm glass-panel p-5">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Order Number</span>
          <input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="IVR-10482" className="mt-2 w-full rounded-sm border border-border bg-secondary px-4 py-3 text-sm focus-ivora" />
        </label>
        <Button className="mt-4" variant="editorial" onClick={() => setSearched(true)}>Track Order</Button>
      </div>
      {searched ? (
        order ? (
          <div className="mt-10 rounded-sm bg-secondary p-6">
            <p className="editorial-label">{order.id}</p>
            <div className="mt-8 space-y-5">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full ${index === 0 ? "bg-sage text-sage-foreground" : "bg-background text-muted-foreground"}`}>{index === 0 ? <Check className="size-4" /> : index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em]">{step}</p>
                    <p className="text-sm text-muted-foreground">{index === 0 ? "Your IVORA order is confirmed." : "Pending"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-8 text-muted-foreground">No local IVORA order found with that number.</p>
        )
      ) : null}
    </main>
  );
}

export function JournalPage() {
  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <p className="editorial-label">Journal</p>
      <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">THE IVORA JOURNAL</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="pb-20 pt-28">
      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div className="flex flex-col justify-center py-12">
          <p className="editorial-label">About IVORA</p>
          <h1 className="mt-4 font-display text-6xl leading-none sm:text-8xl">DESIGNED FOR EVERYDAY.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">IVORA creates modern essentials focused on clean silhouettes, thoughtful details and effortless style.</p>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">Every piece is developed as part of a complete wardrobe: refined, versatile and calm enough to be worn repeatedly without losing impact.</p>
        </div>
        <img src={campaignImages.one} alt="IVORA brand story" width={1600} height={1200} loading="lazy" className="min-h-[620px] w-full rounded-sm object-cover" />
      </section>
      <NewsletterBand />
    </main>
  );
}

export function CollectionsPage() {
  return (
    <main>
      <EditorialBanner />
      <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeader label="IVORA Collection" title="Signature essentials" />
        <ProductGrid products={products.filter((product) => product.tags.includes("signature") || product.featured)} />
      </section>
      <BuildYourLook />
    </main>
  );
}
