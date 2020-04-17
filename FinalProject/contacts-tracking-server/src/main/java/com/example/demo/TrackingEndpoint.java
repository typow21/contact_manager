package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	private List <Contact> contactList = new ArrayList<>();
	
	//**CHANGE WHERE THE CONTACTS ARE BEING STORED, SHOULD BE IN A JSON FILE. ALL METHODS MUST BE UPDATED WITH THE JSON FILE BY REPLACING THE ARRAYLIST contactList**
	
	//This method will *get* and save the data into a contact data structure, from the page where the contact is created.
	//So this method creates a single contact
	//Then the contact is added to an eventsLists which is basically a list of contacts
	@CrossOrigin(origins = "*")
	@GetMapping("/new-contact")
	public String fetchContacts(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("phoneNumber") String phoneNumber, @RequestParam("address") String address, @RequestParam("birthday") String birthday) {
		
		//Actual item, that is of type Contact, to add to the list of contacts
//		Contact item = new Contact();
		
		//update the id according to location of array
//		item.firstName = firstName;
//		item.lastName = lastName;
//		item.phoneNumber = phoneNumber;
//		item.address = address;
//		item.birthday = birthday;
		
		//ADD RELATIONSHIP HERE?
		
		//Add the event to the event list
//		contactList.add(item);
		
		return "Contact created";
		
	}
	
	//CREATE A METHOD TO RETURN A SINGLE CONTACT HERE
	
	//Returns the contacts stored in the eventsList
	@CrossOrigin(origins = "*")
	@GetMapping("/load-contacts")
	public List <Contact> printListOfContacts() {
		System.out.println("Reached");
		Contact newContact = new Contact("Tyler", "Powell", "570","245",1);
		contactList.add(newContact);
		//Return an array of JSON objects, so figure out how to make JSON objects in Java
		return contactList;
		
	}
	
	//Deletes a contact according to the id given
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete-contact/{contactId}")
	public void deleteContact(@PathVariable("contactId") int contactId) {
		
		Integer indexToDelete = null;
		
		//Go through list to find contact to remove 
		for (int i = 0; i < contactList.size(); i++) {
			
			//Check if found the contact to remove from the list
			if(contactList.get(i).id == contactId) {
				
				indexToDelete = i;
				//Break out of for loop
				break;
				
			}
			
		}
		
		//If found the index of the contact to delete
		if (indexToDelete != null) {
			
			//Remove that contact from the contactList, do so by casting the object indexToDelete, of type Integer, into an int 
			contactList.remove((int)indexToDelete);
		
		//If contact to be deleted doesn't exist or wasn't found, print out a message	
		} else {
			
			throw new IllegalArgumentException ("Contact either doesn't exist or was not found");
			
			//System.out.println("Contact either didn't exist or was not found");
			
		}
		
	}
	
	//CREATE A METHOD TO UPDATE or EDIT THE CONTATCS IN THE JSON FILE, CURRENTLY STILL THE ARRAYLIST
	
	//Main does nothing in here
	public static void main(String[] args) {
			
			

	}

}