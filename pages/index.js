import Head from 'next/head';
import styles from '../styles/Home.module.css';
import imageUrlBuilder from '@sanity/image-url';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function Home({posts}) {

    const router = useRouter();
    const [mappedPosts, setMappedPosts] = useState([]);

    useEffect(() => {
        if (posts.length) {
            const imgBuilder = imageUrlBuilder({projectId: 'e5yii607', dataset: 'production'});

            setMappedPosts(posts.map(p => {
                return {
                    ...p,
                    // mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
                    mainImage: imgBuilder.image(p.mainImage)
                }
            }));
        } else {
            setMappedPosts([]);
        }
    }, [posts]);


    return (
        <div className={
            styles.container
        }>
            {/* <div> */}

            <Head>

                <title>Jaixia</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&display=swap" rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/npm/@klaxit/cookie-consent@X.Y.Z/dist/cookie-consent.js"></script>
                <script type="text/javascript" src="https://unpkg.com/jquery@1.11.1/dist/jquery.js" defer></script>
                <script type="module" src="../assets/app.js" defer></script>
            </Head>

            <div>


                <div id="tooltip"
                    className={
                        styles.cursorimg
                }>
                    <img src="/curw.cur" alt="Flower" width="50px" height="50px"/>
                </div>


                <header>
                    <div className={
                        styles.row
                    }>
                        <div className={
                            styles.logorow
                        }>
                            <img src="/logo.png" alt="logo"
                                className={
                                    styles.logo
                                }/>
                        </div>
                    </div>
                </header>


                <nav className={
                    styles.navigation
                }>
                    <ul className={
                        styles.mainmenu
                    }>
                        <li>
                            <a href="">Home</a>
                            <img src="/button.png" alt="logo"
                                className={
                                    styles.buttonback
                                }/></li>
                        <li>
                            <a href="">Music & Lyrics</a>
                        </li>
                        <li>
                            <a href="">Shop</a>
                        </li>
                        <li>
                            <a href="">Jigsaw Heritage</a>
                        </li>
                        <li>
                            <a href="">About</a>
                        </li>
                        <li>
                            <a href="">Meditations</a>
                        </li>
                        <li>
                            <a href="">Shows</a>
                        </li>
                        <li>
                            <a href="">Workshops</a>
                        </li>
                    </ul>
                </nav>


                <div className={
                    styles.feed
                }>
                    {
                    mappedPosts.length ? mappedPosts.map((p, index) => (
                        <div onClick={
                                () => router.push(`/post/${
                                    p.slug.current
                                }`)
                            }
                            key={index}
                            className={
                                styles.post
                        }>
                            <img className={
                                    styles.mainImage
                                }
                                src={
                                    p.mainImage
                                }/>
                        </div>
                    )) : <>No Posts Yet</>
                } </div>


            </div>


            <footer>
                <div className={
                    styles.footercopy
                }>
                    <ul className={
                        styles.footercopyright
                    }>
                        <li>
                            <a href="#">Menu</a>
                        </li>
                        <li>
                            <a href="#">About Us</a>
                        </li>
                        <li>
                            <a href="#">Services</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Strategy</a>
                        </li>
                        <li>
                            <a href="#">Contact us</a>
                        </li>
                    </ul>
                </div>
            </footer>


            <style jsx>
                {`
           main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            color: white;
            text-align: center;}
            
            header {
              // margin-top: 20px;
              // padding-bottom: 10px;
            }
            
      `}</style>

            <style jsx global>
                {`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-family: 'Cormorant Garamond', serif;
          cursor: url("cur.png"), url("cur.cur"), default;
          cursor: url(cur.png), auto;
        }
        * {
          box-sizing: border-box;
        }

        
      `}</style>
        </div>
    )
}


export const getServerSideProps = async pageContext => {
    const query = encodeURIComponent('*[ _type == "post" ]');
    const url = `https://e5yii607.api.sanity.io/v1/data/query/production?query=${query}`;
    const result = await fetch(url).then(res => res.json());

    if (! result.result || ! result.result.length) {
        return {
            props: {
                posts: []
            }
        }
    } else {
        return {
            props: {
                posts: result.result
            }
        }
    }
};

