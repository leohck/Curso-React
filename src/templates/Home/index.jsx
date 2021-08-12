import {useEffect, useState, useCallback} from "react";

import './styles.css';

import {loadPosts} from "../../utils/load-posts";
import {Posts} from "../../components/Posts";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ?
        allPosts.filter(post => {
            return post.title.toLowerCase()
                .includes(searchValue.toLowerCase())
        })
        : posts;


    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPosts();

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
    }, []);
 
    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);
        setPosts(posts);
        setPage(nextPage);
    }

    const handleChange = (event) => {
        const {value} = event.target;
        setSearchValue(value);
    }

    useEffect(() => {
        console.log(new Date().toLocaleDateString("pt-br"));
        handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    return (
        <section className="container">
            <div className="search-container">
                <Input
                    searchValue={searchValue}
                    onChange={handleChange}
                />
            </div>

            {filteredPosts.length > 0 && (
                <Posts posts={filteredPosts}/>
            )}
            {filteredPosts.length === 0 && (
                <p>Posts não encontrados</p>
            )}

            <div className="button-container">
                {!searchValue && (
                    <Button
                        disabled={noMorePosts}
                        onClick={loadMorePosts}
                        text="Load more posts"
                    />
                )}
            </div>
        </section>
    );
}

export default Home;
