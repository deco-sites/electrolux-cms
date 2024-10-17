import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Image {
  image?: {
    src: ImageWidget;
    alt: string;
    title: string;
    width: number;
    height: number;
    preload?: boolean;
    decoding?: "async" | "sync" | "auto";
    loading?: "lazy" | "eager" | "auto";
    fetchPriority?: "high" | "low" | "auto";
  };
  link?: {
    url?: string;
    attributeTitle?: string;
    attributeNofollow?: boolean;
    openNewTab?: boolean;
  };
  analytics?: {
    analyticsEvent?: boolean
    promotionId?: string;
    promotionName?: string;
    promotionPosition?: string;
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
            src = "",
            alt = "",
            title = "",
            width = 1920,
            height = 420,
            decoding = "async",
            fetchPriority = "high",
            loading = "lazy",
            preload = false,
          } = {},
          link: {
            url = "",
            attributeTitle = "",
            attributeNofollow = false,
            openNewTab = true,
          } = {},
          analytics: {
            analyticsEvent = false,
            promotionId = "",
            promotionName = "",
            promotionPosition = "",
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
              src={src}
              alt={alt}
              title={title}
              width={width}
              height={height}
              fetchPriority={fetchPriority}
              decoding={decoding}
              loading={
                preload ? "eager" : loading === "auto" ? "lazy" : loading
              }
            />
          </a>
        );
      })}
    </div>
  );
}
