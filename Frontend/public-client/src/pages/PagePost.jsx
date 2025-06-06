//Single Post component
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "../api/posts";
//STYLES LINK 
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none"
  }
});
export default function PagePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPost(postId);
        setPost(postData);
      } catch (error) {
        setError(`Failed to fetch post: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  if (!post) {
    return (
      <>
    <Typography>Post Not Found, Please go back to All Posts.</Typography>
    <IconButton
        color="primary"
        edge="start"
        aria-label="ALL POSTS"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
        href="http://localhost:5174"
      >
        <ArrowBackIosNewIcon />
        <Typography>ALL POSTS</Typography>
      </IconButton>
      </>
  )  
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <IconButton
        color="primary"
        edge="start"
        aria-label="ALL POSTS"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
        href="http://localhost:5174"
      >
        <ArrowBackIosNewIcon />
        <Typography>ALL POSTS</Typography>
      </IconButton>
      <Chip
        size="medium"
        label={post.tag.tag}
        color="primary"
        variant="outlined"
        sx={{ width: { xs: "100%", md: "fit-content", overflow: "auto" } }}
      />

      <Typography variant="h1">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="primary">
          By {post.author.username}
        </Typography>
        <Typography variant="caption" color="warning">
          {format(new Date(post.created_at), "dd MMMM yyyy")}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Aroan Showarts"
        image={post.url}
        aspect-ratio="16 / 9"
        sx={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
      />
      <Typography
        variant="h4"
        component="div"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        {/* NEXT AND PREVIOUS POST */}
        <Box
          color="primary"
          edge="start"
          aria-label="ALL POSTS"
          sx={{ width: { xs: "fit-content",md:"fit-content", overflow: "auto" }}}
          >
          <StyledLink to={`/post/${post.post_id - 1}`} sx={{display: "flex",flexDirection: "row",gap:1,}}>
          <ArrowBackIcon />
          <Typography>Previous Post</Typography>
          </StyledLink>
        </Box>

        <Box
          color="primary"
          edge="start"
          aria-label="ALL POSTS"
          sx={{ width: { xs: "20%", overflow: "auto" } }}
        >
          <StyledLink to={`/post/${post.post_id + 1}`} sx={{display: "flex",flexDirection: "row",gap:1,}}>
          <Typography>Next Post</Typography>
          <ArrowForwardIosIcon />
          </StyledLink>
        </Box>
      </Box>
    </Box>
  );
}
