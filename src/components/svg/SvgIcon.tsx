import {
  SvgApplicationsIcon,
  SvgDigitalContentIcon,
  SvgHostingIcon,
  SvgContractIcon,
  SvgVideoIcon,
  SvgUndoIcon,
  SvgWebsitesIcon,
  SvgBrandIcon,
  SvgHandshakeIcon,
  SvgCircleIcon,
} from "../../components/svg/index";

interface SvgIconProps {
  icon: string;
}

export const SvgIcon = (props: SvgIconProps) => {
  const getSvgIcon = () => {
    switch (props.icon) {
      case "brand": {
        return <SvgBrandIcon />;
      }
      case "websites": {
        return <SvgWebsitesIcon />;
      }
      case "applications": {
        return <SvgApplicationsIcon />;
      }
      case "digitalcontent": {
        return <SvgDigitalContentIcon />;
      }
      case "hosting": {
        return <SvgHostingIcon />;
      }
      case "video": {
        return <SvgVideoIcon />;
      }
      case "undo": {
        return <SvgUndoIcon />;
      }
      case "partnership": {
        return <SvgHandshakeIcon />;
      }
      case "contract": {
        return <SvgContractIcon />;
      }
      case "circle": {
        return <SvgCircleIcon />;
      }
    }
  };

  const svgIconOutput = getSvgIcon();

  return <>{svgIconOutput}</>;
};
