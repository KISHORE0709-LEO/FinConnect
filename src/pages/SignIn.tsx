import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import Spline from '@splinetool/react-spline';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
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

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-20">
          <Card className="w-full max-w-md p-8 bg-card/90 border-primary/30 glow-card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 glow-text">Welcome Back! 👋</h2>
              <div className="lg:hidden mb-4">
                <h3 className="text-lg font-semibold text-primary" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  FINCONNECT
                </h3>
                <p className="text-sm text-muted-foreground">Your Smart Money Journey Starts Here.</p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter registered email or mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input border-primary/30 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-border py-6 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Streak Badge */}
              <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm text-primary">
                  🟢 Log in 5 days in a row to unlock the Smart Saver Badge
                </p>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
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

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  New to FinConnect?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-semibold">
                    Create an account →
                  </Link>
                </p>
              </div>

              {/* Motivational Message */}
              <div className="text-center pt-4">
                <p className="text-xs text-muted-foreground">
                  "Learning money is the first step to earning money. We're here with you 🤝"
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;