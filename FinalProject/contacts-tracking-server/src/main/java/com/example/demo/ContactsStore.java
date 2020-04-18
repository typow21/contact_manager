package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

//Code in here is only for creating a contact, deleting a contact, and fetching the contacts
//NO CODE FOR THE REST IN HERE, LEAVING ALL OF THAT IN THE REST CONTROLLER, ITS CLEANER AND EASIER TO READ

@Component 
public class ContactsStore {
	
	private static final ObjectMapper mapper = new ObjectMapper();
	
	//**Where do I store the file?**
	public static final File storeFile = new File("./store.json");
	
	//A list of objects where each object, Contact, will hold the parameters passed in
	private List <Contact> contactList = new ArrayList<>();
	//Possibly put id for contact here 
	
	private int id = 1;
	
	//Returns the contacts stored in the contactList
	public List <Contact> fetchContacts() {
		
		return this.contactList;
		
	}
	
	//Method creates a single contact
	//This method will *get* and save the data into a contact data structure, from the page where the contact is created.
	//Then the contact is added to an eventsLists which is basically a list of contacts, and returns the contact created.
	public Contact createContacts(String firstName, String lastName, String phoneNumber, String address, String birthday) {
		
		//Actual item, that is of type Contact, to add to the list of contacts
		Contact item = new Contact(id, firstName, lastName, phoneNumber, address, birthday);
		
		//Add the event to the event list
		contactList.add(item);
		
		//increment id here?
		this.id++;
		
		this.saveContacts();
		
		return item;
		
	}
	
	//Deletes a contact according to the id given
	public void deleteContact(int contactId) {
		
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
		
		this.saveContacts();
		
	}
	
	//CREATE A METHOD TO UPDATE or EDIT THE CONTATCS IN THE JSON FILE, CURRENTLY STILL THE ARRAYLIST
	
	@PostConstruct
	private void reloadContacts() throws IOException {
		
		//If file can be read
		if(storeFile.exists()) {
		
			this.contactList = mapper.readValue(storeFile, new TypeReference<List<Contact>>(){});
			
			System.out.println("Loaded " + this.contactList.size() + " from the JSON file");
			
		} else {
			
			System.out.println("Creating Contacts list");
			
		}
		
	}
	
	private void saveContacts() {
		
		try {
			
			mapper.writeValue(storeFile, this.contactList);
			
		} catch (IOException e) {
			
			e.printStackTrace();
			
		}
		
		
	}

}
