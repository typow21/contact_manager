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
	
	//**Where do I store the file?**
	public static final File storeFile = new File("./store.json");
	
	//A list of objects where each object, Contact, will hold the parameters passed in
	private List <Contact> contactList = new ArrayList<>();
	//Possibly put id for contact here 
	
	private int id = 0;
	
	//Returns the contacts stored in the contactList
	public List <Contact> fetchContacts() {
		
		return this.contactList;
		
	}
	
	//Method creates a single contact
	//This method will *get* and save the data into a contact data structure, from the page where the contact is created.
	//Then the contact is added to an eventsLists which is basically a list of contacts, and returns the contact created.
	public Contact createContacts(String firstName, String lastName, String phoneNumber, String address, String birthday, List<Integer> relationships) {
		
		//Actual item, that is of type Contact, to add to the list of contacts
		Contact item = new Contact(id, firstName, lastName, phoneNumber, address, birthday, relationships);
		
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
	public void editContact(int contactId, String firstName, String lastName, String phoneNumber, String address, String birthday, List <Integer> relationships) {
		
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
			contactList.get((int)indexToEdit).birthday = birthday;
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
	public File tovCard (int contactId, String firstName, String lastName, String phoneNumber, String address, String birthday, List <Integer> relationships) throws IOException {
		
		//Made a vCard
		VCard contact_vCard = new VCard();
		
		//Made the file the vCard will be written to and sent in
		File vCard_File = new File("vcard.vcf");
		
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
		Birthday bday = new Birthday(birthday);
		
		//Added the birthday to the vCard
		contact_vCard.setBirthday(bday);
		
		//Writes the vCard to the file and closes the file
		Ezvcard.write(contact_vCard).go(vCard_File);
		
		//Returning the file where the vCard is written in
		return vCard_File;
		
	}
	
	public Contact toContact(File vCard_File) throws IOException {
		
		//Reading the first, and only, vCard from the file passed in
		VCard contact_vCard = Ezvcard.parse(vCard_File).first();
		
		
		return contact;
		
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
