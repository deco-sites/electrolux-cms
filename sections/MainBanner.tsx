import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Image {
  image?: {
    image: ImageWidget;
    alt: string;
    title: string;
    width: number;
    height: number;
    decoding?: "async" | "sync" | "auto";
    loading?: "lazy" | "eager" | "auto";
    fetchPriority?: "high" | "low" | "auto";
    preloading?: boolean;
  };
  link?: {
    url?: string;
    attributeTitle?: string;
    attributeNofollow?: boolean;
    openNewTab?: boolean;
  };
  analytics?: {
    promotionId?: string;
    promotionName?: string;
    promotionPosition?: string;
    analyticsProperties?: "provide" | "none";
  };
}

interface Props {
  images: Image[];
}

export default function MainBanner({ images = [] }: Props) {
  if (!images?.length) return null;

  return (
    <div class="relative">
      {images.map((item, index) => {
        const {
          image: {
            image = "",
            alt = "",
            title = "",
            width = 1280,
            height = 350,
            decoding = "async",
            fetchPriority = "high",
            loading = "lazy",
            preloading = false,
          } = {},
          link: {
            url = "",
            attributeTitle = "",
            attributeNofollow = false,
            openNewTab = true,
          } = {},
          analytics: {
            promotionId = "",
            promotionName = "",
            promotionPosition = "",
            analyticsProperties = "provide",
          } = {},
        } = item ?? {};

        return (
          <a
            key={index}
            href={url}
            class="flex flex-row gap-1 items-top justify-center text-xs"
            target={openNewTab ? "_blank" : "_self"}
            title={attributeTitle}
            rel={attributeNofollow ? "nofollow" : ""}
          >
            <Image
              src={image}
              alt={alt}
              title={title}
              width={width}
              height={height}
              fetchPriority={fetchPriority}
              decoding={decoding}
              loading={
                preloading ? "eager" : loading === "auto" ? "lazy" : loading
              }
            />
          </a>
        );
      })}
    </div>
  );
}
