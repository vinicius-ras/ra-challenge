# About this project

This project is an implementation of a set of services to exemplify the collection of geolocated user data, as well as filtering and displaying that data according to what is needed by other services. Users are able to file complaints against companies. The filed complaints are geolocated and stripped from the users' identification data, providing both anonymity for users and demographic data for the companies.




# Project structure

The project has been implemented as set of separated web services, which communicate with each other through REST APIs and well-defined protocols. Each service is structured as a separate project contained in its respective folder in this repository. The services that compose the application are the following:

* Complaints service
* Database service
* Maps service
* OIDC (OpenID Connect) Provider service
* Web Application service

The following sub-sections will describe the characteristics of each one of the services. Default ports where each service runs by default will be listed in each service's description.


## Complaints service

### Project characteristics

Implementation technologies:

* **Language:** Java.
* **Spring Web**: used for building the REST APIs provided by the service.
* **Spring Data MongoDB**: used to provide access to the _Database service_.
* **Spring OAuth 2.0 Resource Server**: used to configure API authorization through JWT tokens with the _OpenID Connect Provider (OIDC) Provider service_.

Service characteristics:

* **Default host name:** complaints
* **Default listening port:** 8080


### Service description

This service is responsible for ingesting complaints, being able to store them in the **Database service** and to later retrieve the stored data. This service's API is fully protected by an OAuth 2.0 provider which runs at the _OIDC Service_. It communicates with the _OIDC Provider service_ in order to validate incoming requests through a JWT Bearer token authorization scheme.

There is currently no public surface to this service's API - all of the performed requests require authorization tokens.



## Database service

### Project characteristics

Implementation characteristics:

* **Database provider:** MongoDB.

Service characteristics:

* **Default host name:** db
* **Default listening port:** 27018


This project is actually composed only of files to build Docker containers and populate the database with some initial data.

### Service description

The _Database service_ stores the complaints registered by the users, as well as the geolocation data related to these complaints. Geolocation data about the complaints is stored anonymously, not being directly associated to any user in particular due to privacy concerns. Collected complaints' location data are associated to the companies against which these complaints were filed.

The database service is able to perform geospacial queries which can be used to obtain demographic information about the registered complaints.



## Maps service

### Project characteristics

Implementation characteristics:

* **Language:** Java.
* **Spring Web**: used for building the REST APIs provided by the service.
* **Spring Data MongoDB**: used to provide access to the _Database service_.

Service characteristics:

* **Default host name:** maps
* **Default listening port:** 8081

### Service description

This service is fully focused at answering requests related to geolocalization of complaints filed against companies. It can provide information on complaints registered in specific states and cities, and also filter these complaints by the companies against which they were filed.

Note: this service currently supports cities in Brazil, due to the *Database service* being initialized only with Brazilian cities' and states' data.

This service's APIs are currently fully open, not requiring any type of authorization. Nevertheless, none of this service's APIs answers to non-idempotent requests: they do not modify the database or affect other services' data in any ways.



## OpenID Connect (OIDC) Provider service

### Project characteristics

Implementation characteristics:

* **Language:** .NET / C#.
* **IdentityServer4**: provides a certified implementation for OpenID Connect & OAuth 2.0 protocols.

Service characteristics:

* **Default host name:** oidc-provider
* **Default listening port:** 5000

### Service description

This service provides an implementation of the OpenID Connect and OAuth 2.0 protocols, for authenticating users and authorizing API requests, respectivelly. Thus, this service is focused on emitting JWT Identity Tokens and Authentication Tokens, and also validating the emited tokens for the other services. The implementation is provided by the IdentityServer4 framework, using their default UI for the identity server.

The identity server comes preconfigured with the following test users:

| Login | Password | Roles   |
|-------|----------|---------|
| alice | alice    | company |
| bob   | bob      | client  |

**Important:** only users belonging to the `client` role can file complaints against companies. Thus, to test filing a complaint, you must login as `bob`.



## Web App service

### Project characteristics

Main implementation characteristics:

* **Language:** JavaScript.
* **ReactJS:** used to build the front-end of the application and implement its behavior.
* **oidc-client:** library providing OpenID Connect functionalities for JavaScript-based clients.
* **OpenLayers:** open source library for easily displaying maps, mainly used for GeoJSON-based map features rendering.

Other frameworks and tools:

* **Create React App:** popular tool for creating standardized ReactJS-based applications, including several preconfigured development tools, like WebPack bundler, Jest for writing unit tests, etc.
* **TailwindCSS:** utility-first CSS library used for fast prototypation and UI design.
* **PostCSS (+plugins):** post processing features for CSS files.
* **FontAwesome:** popular icons library for improving UI/UX.

Service characteristics:

* **Default host name:** *none*
* **Default listening port:** 3000

### Service description

The Web Application built to allow clients to have access to all of the other services. The application allows users to view a map with all of the geolocalized complaints that have been registered on that map.

Once accessed for the first time, a login button is displayed for the users. When clicked, the user will be redirected to the OpenID Connect Provider server to perform a login. If the user is logged in, the button turns red and displays the user name, and allows the user to perform a logout if clicked again.

A panel with two tabs is displayed below the login button. One tab is for searching and filtering complaint locations on the map, and the other one is to register new complaints. **Remember:** only users with the `client` role can file complaints against companies.

For a table of **test users** available in the system - as well as their login names, passwords, and respective roles - please refer to the documentation of the *OIDC Provider service*.



# Running the project

## Deploying with Docker Compose locally

All of the project's services can be deployed for local tests with Docker Compose by using the `docker-compose.yml` file in the root of this repository.

```
git clone git@github.com:vinicius-ras/ra-challenge.git
cd ra-challenge
docker-compose up
```

At this point, Docker Compose will read the `docker-compose.yml` file, download any missing container images, build the containers using these images, and start the project.

If you are executing these commands for the first time and the images have not yet been downloaded,
**it might take a while for the whole operation to finish**.

After all services are up and running, you can access the Web Application service at `http://localhost:3000/`.

## Test users

The system comes preconfigured with some **test users**.

Please refer to the documentation for the *OIDC Provider Service* to find a table containing these test users, as well as their **logins and passwords**.

## Visual Studio Code devcontainers

Each of the folder containing each of the services' projects has an internal `.devcontainer` folder with configurations for [Visual Studio Code development containers](https://code.visualstudio.com/docs/remote/containers). This allows for Visual Studio Code to create specialized containers for development purposes, connecting to them and allowing the development of the software **from inside the container**.

Development containers are provided as a courtesy, and come with no support guarantees.