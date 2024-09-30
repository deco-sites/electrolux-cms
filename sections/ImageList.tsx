import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "https://deno.land/x/deco@1.104.2/hooks/useDevice.ts";

interface Image {
  image?: {
    image: ImageWidget;
    mobileImage?: ImageWidget;
    alt: string;
    title: string;
    height: number;
    width: number;
    mobileWidth?: number;
    mobileHeight?: number;
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
    newTab?: boolean;
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
  const device = useDevice();
  const isMobile = device === "mobile";

  if (!images?.length) return null;

  return (
    <div class="relative">
      {images.map((item, index) => {
        const {
          image: {
            image = "",
            mobileImage = "",
            alt = "",
            title = "",
            width = 1280,
            height = 350,
            mobileWidth = 640,
            mobileHeight = 480,
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
            newTab = true,
          } = {},
          analytics: {
            promotionId = "",
            promotionName = "",
            promotionPosition = "",
            analyticsProperties = "provide",
          } = {},
        } = item ?? {};

        const imageSrc = (isMobile && mobileImage) || image;
        const imageWidth = (isMobile && mobileWidth) || width;
        const imageHeight = (isMobile && mobileHeight) || height;

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
              src={imageSrc}
              alt={alt}
              title={title}
              width={imageWidth}
              height={imageHeight}
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
