
import React, { useState } from 'react';
import { QrCode, Smartphone, Shield, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const TwoFactorAuth = () => {
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock secret key and QR code URL
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Helpdesk:user@example.com?secret=${secretKey}&issuer=Helpdesk`;

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedCode(secretKey);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Copied!",
      description: "Secret key copied to clipboard",
    });
  };

  const handleCopyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock backup codes
      const codes = Array.from({ length: 8 }, () => 
        Math.random().toString(36).substr(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      setStep('complete');
      
      toast({
        title: "2FA Enabled!",
        description: "Two-factor authentication has been successfully enabled",
      });
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please check your code and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'setup') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-frappe-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle>Enable Two-Factor Authentication</CardTitle>
          <p className="text-sm text-gray-600">
            Secure your account with an additional layer of protection
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="font-medium mb-4">Step 1: Scan QR Code</h3>
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
              <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Scan this QR code with your authenticator app
            </p>
          </div>

          <div className="space-y-2">
            <Label>Or enter this secret key manually:</Label>
            <div className="flex items-center space-x-2">
              <Input value={secretKey} readOnly className="font-mono text-sm" />
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopySecret}
              >
                {copiedCode === secretKey ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-frappe-light p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Smartphone className="h-4 w-4 text-frappe-primary" />
              <span className="font-medium text-sm">Recommended Apps:</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Google Authenticator</li>
              <li>• Microsoft Authenticator</li>
              <li>• Authy</li>
            </ul>
          </div>

          <Button 
            onClick={() => setStep('verify')} 
            className="w-full bg-frappe-primary hover:bg-frappe-primary/90"
          >
            I've Added the Account
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'verify') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-frappe-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <CardTitle>Verify Setup</CardTitle>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="text-center text-lg font-mono tracking-wider"
              maxLength={6}
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setStep('setup')}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || isLoading}
              className="flex-1 bg-frappe-primary hover:bg-frappe-primary/90"
            >
              {isLoading ? 'Verifying...' : 'Verify & Enable'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-frappe-success rounded-full mx-auto mb-4 flex items-center justify-center">
          <Check className="h-8 w-8 text-white" />
        </div>
        <CardTitle>2FA Enabled Successfully!</CardTitle>
        <p className="text-sm text-gray-600">
          Save these backup codes in a secure location
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Important: Save Your Backup Codes</h3>
          <p className="text-sm text-yellow-700">
            These codes can be used to access your account if you lose your phone. 
            Each code can only be used once.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Backup Codes:</Label>
          <div className="grid grid-cols-2 gap-2">
            {backupCodes.map((code, index) => (
              <div key={index} className="flex items-center space-x-2">
                <code className="flex-1 text-sm bg-gray-100 p-2 rounded font-mono">
                  {code}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopyBackupCode(code)}
                >
                  {copiedCode === code ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-frappe-primary hover:bg-frappe-primary/90">
          I've Saved My Backup Codes
        </Button>
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
