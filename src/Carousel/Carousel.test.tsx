import { render, screen } from "@testing-library/react";
import Carrousel from "./Carousel";

// Mock de swiper et ses dépendances
jest.mock("swiper/react", () => ({
  Swiper: ({ children, ...props }: any) => (
    <div data-testid="swiper" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock("swiper/modules", () => ({
  Autoplay: "Autoplay",
  EffectFade: "EffectFade",
  Pagination: "Pagination",
}));

describe("Composant Carrousel", () => {
  // Fonction de rendu simple pour les tests
  const renderItem = (item: string) => <div data-testid="item">{item}</div>;

  test("ne rend rien quand la liste est vide", () => {
    const { container } = render(
      <Carrousel items={[]} renderItem={renderItem} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("rend directement l'élément quand il n'y a qu'un seul item", () => {
    render(<Carrousel items={["élément unique"]} renderItem={renderItem} />);
    expect(screen.getByTestId("item")).toHaveTextContent("élément unique");
    expect(screen.queryByTestId("swiper")).not.toBeInTheDocument();
  });

  test("rend le Swiper quand il y a plusieurs éléments", () => {
    render(
      <Carrousel items={["élément 1", "élément 2"]} renderItem={renderItem} />
    );

    expect(screen.getByTestId("swiper")).toBeInTheDocument();
    expect(screen.getAllByTestId("swiper-slide")).toHaveLength(2);
    expect(screen.getAllByTestId("item")[0]).toHaveTextContent("élément 1");
    expect(screen.getAllByTestId("item")[1]).toHaveTextContent("élément 2");
  });

  test("passe les props correctement au Swiper", () => {
    const id = "test-carousel";
    const spaceBetween = 10;

    render(
      <Carrousel
        id={id}
        spaceBetween={spaceBetween}
        items={["élément 1", "élément 2"]}
        renderItem={renderItem}
      />
    );

    const swiper = screen.getByTestId("swiper");
    const props = JSON.parse(swiper.getAttribute("data-props") || "{}");

    expect(props.id).toBe(id);
    expect(props.spaceBetween).toBe(spaceBetween);
    expect(props.loop).toBe(true);
    expect(props.autoplay).toEqual({
      delay: 3000,
      disableOnInteraction: false,
    });
    expect(props.pagination).toEqual({ clickable: true });
  });

  test("utilise la valeur par défaut de spaceBetween quand non spécifié", () => {
    render(
      <Carrousel items={["élément 1", "élément 2"]} renderItem={renderItem} />
    );

    const swiper = screen.getByTestId("swiper");
    const props = JSON.parse(swiper.getAttribute("data-props") || "{}");

    expect(props.spaceBetween).toBe(0);
  });
});
