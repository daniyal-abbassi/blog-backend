import DOMPurify from "dompurify";
import {format} from 'date-fns';
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
  }
})

const articleInfo = [
  {
    tag: "Engineering",
    title: "The future of AI in software engineering",
    description:
      "Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    tag: "Product",
    title: "Driving growth with user-centric product design",
    description:
      "Our user-centric product design approach is driving significant growth. Learn about the strategies we employ to create products that resonate with users.",
    authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
  },
  {
    tag: "Design",
    title: "Embracing minimalism in modern design",
    description:
      "Minimalism is a key trend in modern design. Discover how our design team incorporates minimalist principles to create clean and impactful user experiences.",
    authors: [{ name: "Kate Morrison", avatar: "/static/images/avatar/7.jpg" }],
  },
  {
    tag: "Company",
    title: "Cultivating a culture of innovation",
    description:
      "Innovation is at the heart of our company culture. Learn about the initiatives we have in place to foster creativity and drive groundbreaking solutions.",
    authors: [{ name: "Cindy Baker", avatar: "/static/images/avatar/3.jpg" }],
  },
  {
    tag: "Engineering",
    title: "Advancing cybersecurity with next-gen solutions",
    description:
      "Our next-generation cybersecurity solutions are setting new standards in the industry. Discover how we protect our clients from evolving cyber threats.",
    authors: [
      { name: "Agnes Walker", avatar: "/static/images/avatar/4.jpg" },
      { name: "Trevor Henderson", avatar: "/static/images/avatar/5.jpg" },
    ],
  },
  {
    tag: "Product",
    title: "Enhancing customer experience through innovation",
    description:
      "Our innovative approaches are enhancing customer experience. Learn about the new features and improvements that are delighting our users.",
    authors: [{ name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" }],
  },
  {
    tag: "Engineering",
    title: "Pioneering sustainable engineering solutions",
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: "Agnes Walker", avatar: "/static/images/avatar/4.jpg" },
      { name: "Trevor Henderson", avatar: "/static/images/avatar/5.jpg" },
    ],
  },
  {
    tag: "Product",
    title: "Maximizing efficiency with our latest product updates",
    description:
      "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.",
    authors: [{ name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" }],
  },
  {
    tag: "Design",
    title: "Designing for the future: trends and insights",
    description:
      "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.",
    authors: [{ name: "Kate Morrison", avatar: "/static/images/avatar/7.jpg" }],
  },
  {
    tag: "Company",
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: "Cindy Baker", avatar: "/static/images/avatar/3.jpg" }],
  },
];

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

function Author({ author,date }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          <Avatar alt="Lain" src="Lain" sx={{ width: 24, height: 24 }} />
        </AvatarGroup>
        <Typography variant="caption">{author}</Typography>
      </Box>
      <Typography variant="caption">{format(new Date(date), 'dd MMMM yyyy')}</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const { postsLoading, error, posts, setPosts } = usePosts();
  const [latestPage, setLatestPage] = useState(1);
  const postsPerPage = 6;
  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }, [posts]);

  const startIndex = (latestPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const latestPosts = posts ? posts.slice(startIndex, endIndex) : [];
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 1;
  const handleChangeLatestNumber = (event, newPage) => {
    setLatestPage(newPage);
  };
  if (postsLoading) {
    return (
      <Typography variant="h1" color="warning">
        Loading Posts...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography color="error" variant="h2">
        Error while trying to read posts.
      </Typography>
    );
  }
  if (!posts && posts.length === 0) {
    return (
      <Typography color="primary" variant="h4">
        There is no post availble at the moment.
      </Typography>
    );
  }

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {latestPosts &&
          latestPosts.map((article, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 1,
                  height: "100%",
                }}
              >
                <Typography gutterBottom variant="caption" component="div">
                  {article.tag.tag}
                </Typography>

                <TitleTypography
                  gutterBottom
                  variant="h6"
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === index ? "Mui-focused" : ""}
                >
                  <StyledLink to={`/post/${article.post_id}`}>
                  {article.title}
                  <NavigateNextRoundedIcon
                    className="arrow"
                    sx={{ fontSize: "1rem" }}
                  />
                  </StyledLink>
                </TitleTypography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article.content)
                  }}
                />

                <Author author={article.author.username} date={article.created_at} />
              </Box>
            </Grid>
          ))}
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Pagination
          hideNextButton
          hidePrevButton
          count={totalPages}
          page={latestPage}
          boundaryCount={2}
          onChange={handleChangeLatestNumber}
          siblingCount={1}
        />
      </Box>
    </div>
  );
}
