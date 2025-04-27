import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const meta = {
  title: "Components/Carrousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Données de test
const newsItems = [
  {
    id: 1,
    title: "First actuality",
    description: "Description of the first actuality",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    title: "Second actuality",
    description: "Description of the second actuality",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 3,
    title: "Third actuality",
    description: "Description of the third actuality",
    image: "https://i.pravatar.cc/150?img=5",
  },
];

export const Default: Story = {
  args: {
    items: newsItems,
    renderItem: (item: unknown) => {
      const typedItem = item as {
        image: string;
        title: string;
        description: string;
      };
      return (
        <Card sx={{ maxWidth: 200 }}>
          <CardMedia
            component="img"
            image={typedItem.image}
            alt={typedItem.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {typedItem.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {typedItem.description}
            </Typography>
          </CardContent>
        </Card>
      );
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [newsItems[0]],
    renderItem: Default.args?.renderItem,
  },
};

export const MultipleItems: Story = {
  args: {
    items: newsItems,
    renderItem: (item: unknown) => {
      const typedItem = item as { image: string; title: string };
      return (
        <img
          src={typedItem.image}
          alt={typedItem.title}
          style={{ width: 200 }}
        />
      );
    },
  },
};
