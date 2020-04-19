package com.example.demo;

import org.springframework.web.bind.annotation.RestController;

import ezvcard.VCard;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.util.*;
import java.lang.*;

@RestController
@CrossOrigin(origins = "*")
public class ContactController {
	
	private final ContactsStore store;
	public ContactController(ContactsStore store) {
		
		this.store = store;
		
	}
	
	@PostMapping("/new-contact")
	public Contact createContacts(@RequestBody Contact newContact) {
		System.out.println(newContact.relationships.get(0));
		return this.store.createContacts(newContact.firstName, newContact.lastName, newContact.phoneNumber, newContact.address, newContact.birthday, newContact.relationships);
		
	}
	
	@GetMapping("/load-contacts")
	public List <Contact> fetchContacts() {
		
		//Return all the contacts stored in the JSON file
		return store.fetchContacts();
		
	}
	
	@DeleteMapping("/delete-contact/{contactId}")
	public void deleteContact(@PathVariable("contactId") int contactId) {
		
		this.store.deleteContact(contactId);
			
	}
	
	@PostMapping("/edit-contact")
	public void editContact(@RequestBody Contact editContact) {
		
		this.store.editContact(editContact.id, editContact.firstName, editContact.lastName, editContact.phoneNumber, editContact.address, editContact.birthday, editContact.relationships);
		
	}
	
	@PostMapping("/contact-to-vCard")
	public void tovCard (@RequestBody Contact contact) throws IOException {
		
		this.store.tovCard(contact.firstName, contact.lastName, contact.phoneNumber, contact.address, contact.birthday);
		
	}
	
	@GetMapping("/download-contact")
	public File downloadContact() throws IOException {
		
		return this.store.downloadvCard();
		
	}
	
	@PostMapping("/vCard-to-contact")
	public void toContact (@RequestBody File vCard_File) throws IOException {
		
		this.store.toContact(vCard_File);
		
	}
	
	//Main does nothing in here, technically doesn't need to even be made but I have it here just to remind myself its not needed
	public static void main(String[] args) {
			
			

	}

}