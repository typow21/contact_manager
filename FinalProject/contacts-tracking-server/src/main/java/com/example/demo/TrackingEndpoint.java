package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.PrintStream;
import java.util.*;
import java.lang.*;

@RestController
public class TrackingEndpoint {
	
	//A list of objects where each object, Contact, will hold the parameters passed in
	private List <Contact> eventsList = new ArrayList<>();
	
	//This method will save the data from the requests, this is for the page where the contact is created
	@CrossOrigin(origins = "*")
	@GetMapping("/new-contact")
	public String trackRequest(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("phoneNumber") String phoneNumber, @RequestParam("address") String address, @RequestParam("birthday") String birthday) {
		
		//Actual event, that is of type Contact, to add to the list of events
		Contact event = new Contact();
		
		
		
		//Add the event to the event list
		eventsList.add(event);
		
		return "Tracked Event";
		
	}
	
	//Returns the data, from the list that stores all the events, to a "database" which is a CSV file 
	@CrossOrigin(origins = "*")
	@GetMapping("/load-contacts")
	public List <Contact> fetchedTrackedEvents() {
		
		//Return an array of JSON objects, so figure out how to make JSON objects in Java
		return eventsList;
		
	}
	
	
	//Main does nothing in here
	public static void main(String[] args) {
			
			

	}

}

//Questions:
// Do we find out if they have some sort of relationship in this server?

/* import org.springframework.http.Entity;
https://www.baeldung.com/spring-boot-json
https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa
https://www.baeldung.com/the-persistence-layer-with-spring-and-jpa
https://docs.spring.io/spring/docs/3.0.x/javadoc-api/org/springframework/http/ResponseEntity.html

RequestEntity ? Not sure what that is
Get Postman application

*/
