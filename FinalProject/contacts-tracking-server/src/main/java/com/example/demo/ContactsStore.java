package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ezvcard.Ezvcard;
import ezvcard.VCard;
import ezvcard.property.Address;
import ezvcard.property.Birthday;
import ezvcard.property.StructuredName;
import ezvcard.property.Telephone;

//Code in here is only for creating a contact, deleting a contact, and fetching the contacts
//NO CODE FOR THE REST IN HERE, LEAVING ALL OF THAT IN THE REST CONTROLLER, ITS CLEANER AND EASIER TO READ

@Component 
public class ContactsStore {
	
	private static final ObjectMapper mapper = new ObjectMapper();
	
	//Creating a json file that will be storing the contacts to this project folder
	public static final File storeFile = new File("./store.json");
	
	//Creating a vcard file that will be storing the vCard to this project folder
	//public static final File vCard_File = new File("./vcard.vcf");
	
	//Made the file the vCard will be written to and sent in
	File vCard_File = new File("vcard.vcf");
	
	//A list of objects where each object, Contact, will hold the parameters passed in
	private List <Contact> contactList = new ArrayList<>();
	
	
	//Contact ID 
	private int id = 0;
	
	//To see if the id needs to be set to 
	boolean vCard_To_Contact = false;
	
	//Returns the contacts stored in the contactList
	public List <Contact> fetchContacts() {
		
		return this.contactList;
		
	}
	
	//Method creates a single contact
	//This method will *get* and save the data into a contact data structure, from the page where the contact is created.
	//Then the contact is added to an eventsLists which is basically a list of contacts, and returns the contact created.
	public Contact createContacts(String firstName, String lastName, String phoneNumber, String address, List<Integer> relationships) {
		
		//If vCard_To_Contact is true then set the id to the contactList size cause the parameters are coming from a vCard
//		if (vCard_To_Contact == true) {
//			
//			
//			
//			//Set vCard_To_Contact back to false so that id will not be set to the contactList size again 
//			vCard_To_Contact = false;
//			
//		}
		
		id = contactList.size();
		//Actual item, that is of type Contact, to add to the list of contacts
		Contact item = new Contact(id, firstName, lastName, phoneNumber, address,  relationships);
		
		//Add the event to the event list
		contactList.add(item);
		
		//increment id here?
//		this.id++;
		
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
			for(int i = indexToDelete; i<contactList.size(); i++) {
				contactList.get(i).id--;
				for(Contact contact : contactList) {
					for(Integer num : contact.relationships) {
						if(num > indexToDelete) {
							num--;
						}
					}
				}
			}
			for(Contact contact : contactList) {
				for(Integer num : contact.relationships) {
					if(num.equals(indexToDelete)) {
						num = -1;
					}
				}
			}
			id = contactList.size();
		//If contact to be deleted doesn't exist or wasn't found, print out a message	
		} else {
			
			throw new IllegalArgumentException ("Contact either doesn't exist or was not found");
			
			//System.out.println("Contact either didn't exist or was not found");
			
		}
		
		//Save the changes to the json file, which will be that the contact was deleted or not deleted at all
		this.saveContacts();
		
	}
	
	//Method updates a contact that is being changed by the user
	public void editContact(int contactId, String firstName, String lastName, String phoneNumber, String address, List <Integer> relationships) {
		
		Integer indexToEdit = null;
		
		//Go through list to find contact to edit 
		for (int i = 0; i < contactList.size(); i++) {
					
			//Check if found the contact to edit from the list
			if(contactList.get(i).id == contactId) {
						
				indexToEdit = i;
				//Break out of for loop
				break;
						
			}
					
		}
		
		//If found the index of the contact to edit, edit all the fields. If the field isn't changed then nothing was passed in to change that field
		if (indexToEdit != null) {
			
			contactList.get((int)indexToEdit).firstName = firstName;
			contactList.get((int)indexToEdit).lastName = lastName;
			contactList.get((int)indexToEdit).phoneNumber = phoneNumber;
			contactList.get((int)indexToEdit).address = address;
//			contactList.get((int)indexToEdit).birthday = birthday;
			contactList.get((int)indexToEdit).relationships = relationships;
		
		//If contact to be edited doesn't exist or wasn't found, print out a message	
		} else {
			
			throw new IllegalArgumentException ("Contact could not be edited");
			//System.out.println("Contact could not be edited");
			
		}
		
		//Save the changes to the contact, or the new contact, into the json file 
		this.saveContacts();
		
	}
	
	//Method to create a vCard for the contact passed in from the site
	public void tovCard (String firstName, String lastName, String phoneNumber, String address) throws IOException {
		
		//Made a vCard
		VCard contact_vCard = new VCard();
		
		//Made the file the vCard will be written to and sent in
		//File vCard_File = new File("vcard.vcf");
		
		//Concatenated the first and last name with a space in between
		String name = firstName + " " + lastName; 
		
		//Added the concatenated name the the vCard
		contact_vCard.setFormattedName(name);
		
		//Created a phone number object for the vCard and added the contact's phone number to the object
		Telephone tel = new Telephone(phoneNumber);
		
		//Added the phone number to the object
		contact_vCard.addTelephoneNumber(tel);
		
		//Created an address object for the vCard added the contact's address to the object
		Address adr = new Address();
		
		//added the contact's address to the object
		adr.setStreetAddress(address);
		
		//Added the address to the vCard
		contact_vCard.addAddress(adr);
		
		//created a birthday object for the vCard and added the contact's birthday to the object
//		Birthday bday = new Birthday(birthday);
		
		//Added the birthday to the vCard
//		contact_vCard.setBirthday(bday);
		
		//Writes the vCard to the file and closes the file
		Ezvcard.write(contact_vCard).go(vCard_File);
		
		//Store vcard file to local directory
		//this.savevCards();
		
		
	} 
	
	public void toContact(File vCard_File) throws IOException {
		
		
		//Reading the first, and only, vCard from the file passed in then closes the file
		VCard contact_vCard = Ezvcard.parse(vCard_File).first();
		
		//Pulling the contact's full name from the vCard
		String fullName = contact_vCard.getFormattedName().getValue();
		
		//Splitting the fullName string at the space and putting the name into an array of Strings
		String [] split_fullName = fullName.trim().split("\\s+");
		
		//Get the first name from the array
		String firstName = split_fullName [0]; 
		
		//Get the last name from the array
		String lastName = split_fullName [1];
		
		//Created a list to pull all of the phone numbers
		List <Telephone> phoneNumberList = new ArrayList<>();
		
		//pulled the phone numbers out of the object in the vCard
		phoneNumberList = contact_vCard.getTelephoneNumbers();
		
		//Get the Telephone object from the list at loc 0
		Telephone tel = phoneNumberList.get(0);
		
		//Store the phone number in the string
		String phoneNumber = tel.getText();
		
		//Created list to hold the addresses
		List <Address> addressList = new ArrayList<>();
		
		//Pulled the address list from the vCard and stored it into the list just created
		addressList = contact_vCard.getAddresses();
		
		//Taking the address object from the loc 0 in the address list
		Address adr = addressList.get(0);
		
		//Setting the street address in the address object to the string created
		String address = adr.getStreetAddress();
		
		//Getting the birthday object from the vCard and storing it
		
		//Getting the birthday String from the birthday object
//		String birthday = bday.getText();
		
		//id = contactList.size();
		
		//first 4 locs are populated with the int -1
		List <Integer> relationships = new ArrayList<>();
		
		for (int i = 0; i < 4; i++) {
			
			relationships.add(-1);
			
		}
		
		//Set vCard_To_Contact to true so that the id will be set the the size of the contactList arraylist in the createContacts method
		vCard_To_Contact = true;
		System.out.println("Test Firstname:"+firstName);
		
		
		createContacts(firstName, lastName, phoneNumber, address, relationships);
		
	}
	
	public File downloadvCard() throws IOException {
		
		return vCard_File;
		
	}
	
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
