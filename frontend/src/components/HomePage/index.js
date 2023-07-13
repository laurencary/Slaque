import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import heroVideo from '../../videos/team-discussing.mp4'
import video1 from '../../videos/team-connected.mp4'
import video2 from '../../videos/team-connected2.mp4'
import video3 from '../../videos/team-connected3.mp4'

import NavBar from "../NavBar";
import './HomePage.css'

const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) return <Redirect to={`/client/${sessionUser.id}/get-started/landing`} />;

    return (
        <>
            <NavBar />
            <section className="billboard">
                <header className="home-header">
                    <h1>Made for People.</h1>
                    <h1 className='yellow-text'>Built for productivity.</h1>
                <p>Connect the right people, find anything you need and automate <br>
                </br>the rest. That's work in Slaque, your productivity platform.</p>
                <br></br>
                <p><strong>Slaque is free to try</strong> for as long as you'd like</p>
                </header>
                <aside>
                    <video src={heroVideo} autoPlay loop muted ></video>
                </aside>
            </section>
            <section id="home-info">
                <div className="grid-row">
                    <div className="video-container">
                        <video src={video1} autoPlay loop muted className="video" ></video>
                    </div>
                    <div className="grid-text left">
                        <h2>Bring your team together</h2>
                        <p>At the heart of Slack are channels: organized spaces 
                            for everyone and everything you need for work. In 
                            channels, it’s easier to connect across departments, 
                            offices, time zones and even other companies.</p>
                    </div>
                </div>

                <div className="grid-row">
                    <div className="grid-text right">
                    <h2>Choose how you want to work</h2>
                    <p>In Slaque, you’ve got all the flexibility to work when, where 
                        and how it’s best for you. You can easily chat, send audio
                        and video clips, or hop on a huddle to talk things out live.</p>
                    </div>
                    <div className="video-container">
                        <video src={video2} autoPlay loop muted className="video" ></video>
                    </div>
                </div>

                <div className="grid-row">
                    <div className="video-container">
                        <video src={video3} autoPlay loop muted className="video" ></video>
                    </div>
                    <div className="grid-text left">
                    <h2>Move faster with your tools in one place</h2>
                    <p>With your other work apps connected to Slaque, you can work 
                        faster by switching tabs less. And with powerful tools like 
                        Workflow Builder, you can automate away routine tasks.</p>
                    </div>
                </div>
            </section>
        </>

    )
}

export default HomePage;