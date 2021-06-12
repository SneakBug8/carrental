import React, { useState, useEffect } from "react";
import $ from "jquery";
import { State } from "../State";
import { CarModel } from "../entities/CarModel";
import { Requisite } from "../Requisite";
import { Car } from "../entities/Car";
import { HomeModelCard } from "../partials/HomeModelCard";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "react-context-hook";
import { Loader } from "../partials/Loader";
import { ShowIf } from "../partials/ShowIf";
import { setupDatepickers } from "../utilities/setupDatepickers";
import { ErrorMessage } from "../partials/ErrorMessage";
import { jquery } from "..";

interface IHomeState
{
  models: CarModel[];
  error: Requisite;
  searchModelId: number;
  searchFrom: string;
  searchTo: string;
}

export const Home = (props: RouteComponentProps) =>
{
  const [models, setModels] = useState<CarModel[]>([]);
  const [error, setError] = useState<Requisite>(new Requisite());

  const [loaded, setLoaded] = useState<boolean>(false);

  const [searchModelId, setSearchModelId] = useStore("searchModelId", 0);
  const [searchFrom, setSearchFrom] = useStore("searchFrom", null);
  const [searchTo, setSearchTo] = useStore("searchTo", null);

  useEffect(() =>
  {
    State.GetModels().then((response) =>
    {
      setModels(response.data || new Array<CarModel>());
      setLoaded(true);
    })
      .catch((response) =>
      {
        setError(response);
      });
  }, []);

  function handleSubmit(event: React.FormEvent)
  {
    event.preventDefault();

    const from = jquery("#cf-3").datepicker("getDate");
    const to = jquery("#cf-4").datepicker("getDate");

    console.log(from);
    console.log(to);

    if (from.getTime() < Date.now()) {
      setError(new Requisite().error("Выберите дату начала больше текущей."));
      return;
    }
    if (to.getTime() < Date.now()) {
      setError(new Requisite().error("Выберите дату окончания больше текущей."));
      return;
    }
    if (from.getTime() > to.getTime()) {
      setError(new Requisite().error("Выберите дату начала меньше даты окончания."));
      return;
    }

    setSearchModelId(Number.parseInt(jquery("#cf-2").val() + "" || "", 10));
    setSearchFrom(from);
    setSearchTo(to);

    props.history.push(`/search`);
  }

  useEffect(setupDatepickers);

  return (
    <div>
      <div className="hero" style={{ backgroundImage: "url('images/hero_1_a.jpg')" }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-10">
              <div className="row mb-5">
                <div className="col-lg-7 intro">
                  <h1><strong>Rent a car in Italy</strong> with 0 effort.</h1>
                </div>
              </div>
              <form className="trip-form" onSubmit={handleSubmit}>
                <div className="row align-items-center">
                  <Loader show={!loaded} />
                  <ErrorMessage requisite={error} />
                  <ShowIf show={loaded}>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <select name="" id="cf-2" required className="custom-select form-control">
                        {(models.map((e) =>
                          <option value={e.id} key={e.id}>{e.name}</option>,
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <div className="form-control-wrap">
                        <input type="text" id="cf-3" autoComplete="off" required placeholder="Pick up" className="form-control datepicker px-3" />
                        <span className="icon icon-date_range"></span>
                      </div>
                    </div>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <div className="form-control-wrap">
                        <input type="text" id="cf-4" autoComplete="off" required placeholder="Drop off" className="form-control datepicker px-3" />
                        <span className="icon icon-date_range"></span>
                      </div>
                    </div>
                    <div className="mb-3 mb-md-0 col-md-3">
                      <input type="submit" value="Search Now" className="btn btn-primary btn-block py-3" />
                    </div>
                  </ShowIf>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <h2 className="section-heading"><strong>How it works?</strong></h2>
          <p className="mb-5">Easy steps to get you started</p>

          <div className="row mb-5">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="step">
                <span>1</span>
                <div className="step-inner">
                  <span className="number text-primary">01.</span>
                  <h3>Select a car</h3>
                  <p>Take a look at our models we offer to you.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="step">
                <span>2</span>
                <div className="step-inner">
                  <span className="number text-primary">02.</span>
                  <h3>Fill up form</h3>
                  <p>Select model and planned dates of rental. Don't worry, you can always change them with our managers.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="step">
                <span>3</span>
                <div className="step-inner">
                  <span className="number text-primary">03.</span>
                  <h3>Payment</h3>
                  <p>Pay 50% when taking a car and 50% when returning it.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mx-auto">
              <a href="#" className="d-flex align-items-center play-now mx-auto">
                <span className="icon">
                  <span className="icon-play"></span>
                </span>
                <span className="caption">Video how it works</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center order-lg-2">
              <div className="img-wrap-1 mb-5">
                <img src="images/feature_01.png" alt="Image" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-4 ml-auto order-lg-1">
              <h3 className="mb-4 section-heading"><strong>You can easily avail our promo for renting a car.</strong></h3>
              <p className="mb-5">Rent car before 1st of July and get a 10% discount!</p>
              <p><a href="#" className="btn btn-primary">Rent now</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong>Car Listings</strong></h2>
              <p className="mb-5">Car models you can rent in our company.</p>
            </div>
          </div>

          <div className="row">
            <Loader show={!loaded} />
            {models.map(e => <HomeModelCard model={e} key={e.id} />)}
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong>Features</strong></h2>
              <p className="mb-5">What makes us different from other companies around.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-5">
              <div className="service-1 dark">
                <span className="service-1-icon">
                  <span className="icon-home"></span>
                </span>
                <div className="service-1-contents">
                  <h3>Rent nearby</h3>
                  <p>90% of Italy has our office within 5km!</p>
                  <p className="mb-0"><a href="#">Learn more</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="service-1 dark">
                <span className="service-1-icon">
                  <span className="icon-gear"></span>
                </span>
                <div className="service-1-contents">
                  <h3>Service</h3>
                  <p>If something goes wrong with your car - just call us. Our serviceman will be at your location within half-an-hour.</p>
                  <p className="mb-0"><a href="#">Learn more</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="service-1 dark">
                <span className="service-1-icon">
                  <span className="icon-watch_later"></span>
                </span>
                <div className="service-1-contents">
                  <h3>Saving your time</h3>
                  <p>Renting a car at our office takes no longer than 15 minutes of your time. We make sure you don't waste your vacation on bureucracy.</p>
                  <p className="mb-0"><a href="#">Learn more</a></p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-5">
              <div className="service-1 dark">
                <span className="service-1-icon">
                  <span className="icon-verified_user"></span>
                </span>
                <div className="service-1-contents">
                  <h3>No risks</h3>
                  <p>Our insurance program makes sure you will never be in debt no matter what happens.</p>
                  <p className="mb-0"><a href="#">Learn more</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="service-1 dark">
                <span className="service-1-icon">
                  <span className="icon-video_library"></span>
                </span>
                <div className="service-1-contents">
                  <h3>Still unsure?</h3>
                  <p>Watch video reviews from our customers.</p>
                  <p className="mb-0"><a href="#">Learn more</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-5">
              <div className="service-1 dark">
                <span className="service-1-icon">
                  <span className="icon-vpn_key"></span>
                </span>
                <div className="service-1-contents">
                  <h3>E-key</h3>
                  <p>Want to swap a car in a middle of a journey? Just get to our office and do it!</p>
                  <p className="mb-0"><a href="#">Learn more</a></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong>Testimonials</strong></h2>
              <p className="mb-5">Faces of our happy clients.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="testimonial-2">
                <blockquote className="mb-4">
                  <p>"My wife and I had awesome vacation in South Italy thanks to our rented car at Carrental. We had no problems whatsoever."</p>
                </blockquote>
                <div className="d-flex v-card align-items-center">
                  <img src="images/person_1.jpg" alt="Image" className="img-fluid mr-3" />
                  <div className="author-name">
                    <span className="d-block">Mike Fisher</span>
                    <span>Tourist</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="testimonial-2">
                <blockquote className="mb-4">
                  <p>"My husband and I wanted to have a journey across Europe starting and ending in Italy because of flight back to the US. Carrental was our saviour as they allowed us to leave country in their car!"</p>
                </blockquote>
                <div className="d-flex v-card align-items-center">
                  <img src="images/person_2.jpg" alt="Image" className="img-fluid mr-3" />
                  <div className="author-name">
                    <span className="d-block">Jean Stanley</span>
                    <span>Traveler</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="testimonial-2">
                <blockquote className="mb-4">
                  <p>"I often travel across country in business trips and I don't like traveling long distances in a car. That's why I am a regular customer to Carrental."</p>
                </blockquote>
                <div className="d-flex v-card align-items-center">
                  <img src="images/person_3.jpg" alt="Image" className="img-fluid mr-3" />
                  <div className="author-name">
                    <span className="d-block">Katie Rose</span>
                    <span >Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
