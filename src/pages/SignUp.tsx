import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import Spline from '@splinetool/react-spline';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const passwordRules = [
    { rule: "Minimum 8 characters", check: formData.password.length >= 8 },
    { rule: "At least 1 uppercase", check: /[A-Z]/.test(formData.password) },
    { rule: "At least 1 lowercase", check: /[a-z]/.test(formData.password) },
    { rule: "At least 1 number", check: /\d/.test(formData.password) },
    { rule: "At least 1 symbol (@,#,$,_,&)", check: /[@#$_&]/.test(formData.password) }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Header />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Spline Robot */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
          <div className="w-full h-full">
            <Spline scene="https://prod.spline.design/rU2-Ks0SC0T5od9B/scene.splinecode" />
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-20">
          <Card className="w-full max-w-md p-8 bg-card/90 border-primary/30 glow-card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 glow-text">Join FinConnect! 🚀</h2>
              <div className="lg:hidden mb-4">
                <h3 className="text-lg font-semibold text-primary" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  FINCONNECT
                </h3>
                <p className="text-sm text-muted-foreground">Your Smart Money Journey Starts Here.</p>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="pl-10 bg-input border-primary/30 focus:border-primary"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-input border-primary/30 focus:border-primary"
                  required
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 bg-input border-primary/30 focus:border-primary"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 bg-input border-primary/30 focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 bg-input border-primary/30 focus:border-primary"
                  required
                />
              </div>

              {/* Password Rules */}
              {formData.password && (
                <div className="space-y-2 p-3 bg-card/50 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-foreground">Password Requirements:</p>
                  {passwordRules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {rule.check ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-xs ${rule.check ? 'text-green-500' : 'text-red-500'}`}>
                        {rule.rule}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={setAgreeTerms}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-border py-6 text-lg font-semibold"
                disabled={isLoading || !agreeTerms}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primary hover:underline font-semibold">
                    Sign In →
                  </Link>
                </p>
              </div>

              {/* Motivational Message */}
              <div className="text-center pt-4">
                <p className="text-xs text-muted-foreground">
                  "Every financial expert started as a beginner. Your journey begins now! 💪"
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;