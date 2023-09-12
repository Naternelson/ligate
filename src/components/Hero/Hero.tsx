import { Box, Typography, styled, useTheme, useMediaQuery, Divider, Toolbar } from "@mui/material";
import { ReactNode, useEffect } from "react";

interface HeroBannerStyledProps {
	variant?: "left-right" | "left-full" | "right-left" | "right-full";
}

const HeroBannerStyled = styled(Box)<HeroBannerStyledProps>(({ theme, variant }) => ({
	display: "flex",
	flexDirection: variant?.includes("left") ? "row" : "row-reverse",
	justifyContent: "space-between",
	alignItems: "center",
	maxWidth: "75%",
	margin: "0 auto",
	gap: theme.spacing(4),
	height: "100vh",
	[theme.breakpoints.down("md")]: {
		flexDirection: variant?.includes("left") ? "column" : "column-reverse",
		height: "100vh",
	},
}));

const HeroImage = styled("img")<HeroBannerStyledProps>(({ theme, variant }) => ({
	maxWidth: "50vw",
	maxHeight: variant?.includes("full") ? "100vh" : "80vh",
	[theme.breakpoints.down("md")]: {
		maxWidth: "100%",
		maxHeight: "50vh",
	},
}));

export interface HeroBannerProps {
	variant?: "left-right" | "left-full" | "right-left" | "right-full";
	image: string | { width: number; src: string; alt?: string }[];
	title?: string | ReactNode;
	subtitle?: string | ReactNode;
	cta?: ReactNode;
}

const HeroBanner = (props: HeroBannerProps) => {
	const imageArr = typeof props.image === "string" ? [] : props.image;
	imageArr.sort((a, b) => b.width - a.width);
	const lastImage = imageArr[imageArr.length - 1];
	const imgSrc = typeof props.image === "string" ? props.image : lastImage.src;

	return (
		<Box>
			<HeroBannerStyled variant={props.variant}>
				<Box style={{ flex: 1 }}>
					<Typography variant="h1" textTransform={"uppercase"} fontWeight={"bold"}>
						{props.title}
					</Typography>
					<Typography variant="subtitle1" letterSpacing={".05rem"}>
						{props.subtitle}
					</Typography>
					<Divider />
					{props.cta}
				</Box>
				<Box component={"picture"}>
					{typeof props.image !== "string" &&
						imageArr.map((image, index) => {
							return <source key={index} media={`(min-width: ${image.width}px)`} srcSet={image.src} />;
						})}
					<HeroImage src={imgSrc} alt={"Hero image"} variant={props.variant} />
				</Box>
			</HeroBannerStyled>
		</Box>
	);
};

export default HeroBanner;
