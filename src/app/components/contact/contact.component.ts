import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;
  submitMessage = '';

  // EmailJS configuration - Replace these with your actual values
  private readonly EMAILJS_CONFIG = {
    serviceId: 'service_vqbq97p',
    templateId: 'template_ijgo11i',
    publicKey: 'LTZ3C1NZF8g80P3gu',
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.createContactForm();

    // Initialize EmailJS with your public key
    emailjs.init(this.EMAILJS_CONFIG.publicKey);
  }

  private createContactForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
      personalInterest: ['', [Validators.required, Validators.minLength(10)]],
      message: [''], // Optional field
    });
  }

  // Custom phone validator
  private phoneValidator(control: any) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (
      control.value &&
      !phoneRegex.test(control.value.replace(/[\s\-\(\)]/g, ''))
    ) {
      return { invalidPhone: true };
    }
    return null;
  }

  // Getter methods for easy form control access in template
  get firstName() {
    return this.contactForm.get('firstName');
  }
  get lastName() {
    return this.contactForm.get('lastName');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get personalInterest() {
    return this.contactForm.get('personalInterest');
  }
  get message() {
    return this.contactForm.get('message');
  }

  // Check if a field has error
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.contactForm.get(fieldName);
    if (errorType) {
      return (
        (field?.hasError(errorType) && (field?.dirty || field?.touched)) ||
        false
      );
    }
    return (field?.invalid && (field?.dirty || field?.touched)) || false;
  }

  // Get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength']?.requiredLength;
      return `${this.getFieldDisplayName(
        fieldName
      )} must be at least ${minLength} characters`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('invalidPhone')) {
      return 'Please enter a valid phone number';
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      personalInterest: 'Personal Interest',
      message: 'Message',
    };
    return displayNames[fieldName] || fieldName;
  }

  // Format phone number as user types
  onPhoneInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 10) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    this.contactForm.patchValue({ phone: value });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitStatus = null;

      try {
        const formData = this.contactForm.value;

        // Clean and prepare template parameters - ONLY variables that exist in your form
        const templateParams = {
          name: `${formData.firstName?.trim() || ''} ${
            formData.lastName?.trim() || ''
          }`.trim(),
          email: formData.email?.trim() || '',
          phone: formData.phone?.trim() || '',
          interest: formData.personalInterest?.trim() || '',
          message: formData.message?.trim() || 'No additional message provided',
        };

        // Remove any undefined or null values (optional step)
        Object.keys(templateParams).forEach((key) => {
          if (
            templateParams[key as keyof typeof templateParams] === undefined ||
            templateParams[key as keyof typeof templateParams] === null ||
            templateParams[key as keyof typeof templateParams] === ''
          ) {
            templateParams[key as keyof typeof templateParams] = 'Not provided';
          }
        });

        // Log the parameters for debugging (remove in production)
        // console.log('Sending template parameters:', templateParams);

        // Send email using EmailJS
        const response = await emailjs.send(
          this.EMAILJS_CONFIG.serviceId,
          this.EMAILJS_CONFIG.templateId,
          templateParams
        );

        console.log('Email sent successfully:', response);

        this.submitStatus = 'success';
        this.submitMessage =
          "Thank you! Your consultation request has been sent successfully. We'll contact you within 24 hours.";

        // Reset form after successful submission
        this.contactForm.reset();
      } catch (error: any) {
        console.error('Full error details:', error);

        // More detailed error handling
        let errorMessage = 'Sorry, there was an error sending your message.';

        if (error?.text?.includes('template')) {
          errorMessage += ' Please check the template configuration.';
        } else if (error?.text?.includes('variable')) {
          errorMessage += ' There seems to be an issue with the form data.';
        }

        this.submitStatus = 'error';
        this.submitMessage =
          errorMessage + ' Please try again or call us directly.';
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.contactForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Clear submit status when user starts typing again
  onFieldChange(): void {
    if (this.submitStatus) {
      this.submitStatus = null;
      this.submitMessage = '';
    }
  }
}
